#!/bin/bash
# Build OCaml toplevel for browser execution
# Run this inside the devcontainer

set -e

echo "🐫 Building OCaml Toplevel..."

eval $(opam env)

OUTPUT_DIR="public/ocaml-toplevel"
mkdir -p "$OUTPUT_DIR"

# Create the toplevel wrapper
cat > /tmp/toplevel_main.ml << 'OCAML_EOF'
(* OCaml Toplevel for browser *)
open Js_of_ocaml

let () =
  Js_of_ocaml_toplevel.JsooTop.initialize ();
  
  (* Expose execute function to JavaScript *)
  Js.Unsafe.global##.caml_execute := Js.wrap_callback (fun code_js ->
    let code = Js.to_string code_js in
    let buffer = Buffer.create 1024 in
    let ppf = Format.formatter_of_buffer buffer in
    let () = 
      try
        let lexbuf = Lexing.from_string (code ^ ";;") in
        while true do
          try
            let phrase = !Toploop.parse_toplevel_phrase lexbuf in
            ignore (Toploop.execute_phrase true ppf phrase)
          with
          | End_of_file -> raise End_of_file
          | e -> 
            Format.fprintf ppf "Error: %s@." (Printexc.to_string e);
            raise End_of_file
        done
      with End_of_file -> ()
    in
    Format.pp_print_flush ppf ();
    Js.string (Buffer.contents buffer)
  );
  
  (* Signal ready *)
  Js.Unsafe.global##.ocamlToplevelReady := Js._true;
  Firebug.console##log (Js.string "✅ OCaml toplevel ready!")
OCAML_EOF

echo "🔨 Compiling OCaml to bytecode..."
ocamlfind ocamlc \
  -package js_of_ocaml,js_of_ocaml-toplevel,js_of_ocaml-ppx \
  -linkpkg \
  /tmp/toplevel_main.ml \
  -o /tmp/toplevel.byte

echo "🔨 Converting to JavaScript with js_of_ocaml..."
js_of_ocaml \
  --toplevel \
  +toplevel.js \
  +dynlink.js \
  /tmp/toplevel.byte \
  -o "$OUTPUT_DIR/toplevel.js"

echo ""
echo "✅ Build complete!"
ls -lh "$OUTPUT_DIR/toplevel.js"
