{ pkgs }: {
  deps = [
    pkgs.python38Packages.pwntools
    pkgs.nodePackages.vscode-langservers-extracted
    pkgs.nodePackages.typescript-language-server
  ];
}