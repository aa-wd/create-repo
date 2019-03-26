# create-repo

CLI for creating [Bitbucket](https://bitbucket.org) repositories, written in `nodejs`. Leaves with exit code `1` on failure, `0` on success. 

## Installation
First, clone the repository and build the package:

```console
git clone https://github.com/aa-wd/create-repo.git
cd create-repo
npm install
npm run build

```
Afterwards, make `./dist/create-repo.js` executable and findable in your `$PATH`. In the link, the `.js` extensions is dropped. 

```console
chmod u+x dist/create-repo.js
ln -s $(pwd)/src/create-repo.js $HOME/bin/create-repo
```

## Usage

```console
create-repo YOUR_REPO_NAME
```

## License
[MIT](https://choosealicense.com/licenses/mit/)