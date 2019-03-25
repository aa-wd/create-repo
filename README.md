# create-repo

CLI for creating Bitbucket repositories, written in `nodejs`. Leaves with exit code `1` on failure, `0` on success. 

## Installation


```bash
git clone https://github.com/aa-wd/create-repo.git
cd create-repo

chmod u+x src/create-repo.js  # make executable
ln -s $(pwd)/src/create-repo.js $HOME/bin/create-repo  # create symlink
mv bitbucketConfig.example.json bitbucketConfig.json  # change config filename 
```

Afterwards, set the values of the configuration file to those matching to your account.

```json
{
    "username": "BITBUCKET_USERNAME",
    "accessToken": "",
    "refreshToken": "BITBUCKET_REFRESH_TOKEN",
    "idAndSecret": "BASE64_ENCODED_CLIENT:SECRET"
}
```

## Usage
From the command line:

```bash
create-repo YOUR_REPO_NAME
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
