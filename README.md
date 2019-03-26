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

Finally, use your own credentials in `bitbucketConfig.example.json` and rename it to `bitbucketConfig.json` (remove the `.example.`). You can leave the `accessToken` property empty, the rest needs to be filled in:

```json
{
    "username": "YOUR_BITBUCKET_USERNAME",
    "accessToken": "",
    "refreshToken": "YOUR_REFRESH_TOKEN",
    "idAndSecret": "BASE64_ENCODED_CLIENT:SECRET"
}
```

## Usage
From the command line:

```console
create-repo YOUR_REPO_NAME
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
