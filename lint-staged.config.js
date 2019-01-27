module.exports = {
  linters: {
    '**/*.*(js|json|md|css|css|sass|jsx)': ['prettier --write', 'git add'],
  },
}
