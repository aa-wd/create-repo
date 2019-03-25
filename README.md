# create-repo

CLI for creating Bitbucket repositories, written in `nodejs`. Leaves with exit code `1` on failure, `0` on success. 

## Installation


```bash
git clone https://github.com/aa-wd/create-repo.git
cd create-repo
chmod u+x src/create-repo.js

# create a symlink
ln -s $(pwd)/src/create-repo.js $HOME/bin/create-repo
```

## Usage

```bash
create-repo YOUR_REPO_NAME
```

## License
[MIT](https://choosealicense.com/licenses/mit/)