# Dev Container for OCaml Exercises with js_of_ocaml
FROM ocaml/opam:ubuntu-24.04-ocaml-5.2

USER root

# Install Node.js 22
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

USER opam
WORKDIR /home/opam

# Update opam and install js_of_ocaml packages
RUN opam update && \
    opam install -y \
      js_of_ocaml \
      js_of_ocaml-toplevel \
      js_of_ocaml-compiler \
      js_of_ocaml-ppx \
      ocaml-lsp-server \
      ocamlformat

# Add opam env to bashrc
RUN echo 'eval $(opam env)' >> ~/.bashrc

# Set working directory for the project
WORKDIR /workspaces/exercices-ocaml

# Default command
CMD ["bash"]
