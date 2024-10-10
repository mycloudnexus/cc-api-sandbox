#!/bin/bash

curl -sL -o /tmp/gh.tgz "https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.tar.gz" && \
    cd /tmp && \
    tar xf gh.tgz && \
    mkdir -p "$HOME/.local/bin" && \
    mv gh_*/bin/gh "$HOME/.local/bin/gh" && \
    ls -la "$HOME/.local/bin/"

"$HOME/.local/bin/gh" version
