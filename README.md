## This repository represents a copy of a Sample C1 partner's codebase.

# Setting up your Dev environment

1. Install Visual Studio Code : https://code.visualstudio.com/
2. Install Node.js : https://nodejs.org/en/ 
<br/> -> (please ensure you have the latest version by running ```node -v``` in your command prompt)
<br/> -> If you had a previous version of node installed, run npm upgrade -g to update all your global packages 
3. Install [yarn](https://yarnpkg.com/lang/en/docs/install/)

### VSTS Auth
Setup your machine to consume internal NPM feed

```
npm config set registry "https://microsoft.pkgs.visualstudio.com/_packaging/keystone-npm/npm/registry"
npm config set always-auth "true"
npm install -g vsts-npm-auth --registry https://registry.npmjs.com --always-auth false
vsts-npm-auth -config %USERPROFILE%\.npmrc
```

 ### Clone this repo:

````
cd <PARENT FOLDER FOR REPO>
git clone https://microsoft.visualstudio.com/DefaultCollection/Universal%20Store/_git/D365.Commerce.Fabrikam
cd D365.Commerce.Fabrikam
````

In order to run this repository, you need to do the following:

```
yarn

yarn start
```

After this you can pull up the following page to see if everything works:

http://localhost:4000/version

http://localhost:4000/?mock=default-page

This application will by default talk to PPE (store-ppe.fabrikam.com), but you can change it to talk to any rushmore environment in 2 ways:

1. By using the query string ```?onerf=store-int.fabrikam.com```
2. By modifying the .env file in the root by adding the following configuration setting:
```bash
RAZZLE_ONERF_HOST=store-int.fabrikam.com
```

Run tests
1) Run all test: Run command 'yarn integration' in root directory
2) Run all bvt test: Run command 'yarn integration --test-meta testtype=bvt' in root directory
3) Run all dvt test: Run command 'yarn integration --test-meta testtype=dvt' in root directory

## For Internal Microsoft Developers only

In order to setup your local OneRF box, please ensure your OneRFApp in IIS has rushmore.onerf.microsoft.com as an additional binding.

If not, run ```goodmorning.bat -runsetup``` on your OneRF repository.

* Verify the OneRFApp has additional bindings for ```https://rushmore.dev.microsoft.com``` and hosts file also has the entry for ```rushmore.dev.microsoft.com 127.0.0.1```
* Modify the .env file to change ```RAZZLE_ONERF_HOST=rushmore.dev.microsoft.com```

Afterwards, install the following extension in Visual Studio which gives you the ability to apply transforms:

https://marketplace.visualstudio.com/items?itemName=GolanAvraham.ConfigurationTransform

Find ```Web.rushmore.config``` in OneRFApp and right click and preview transform to see all the changes required to connect to rushmore environments, copy paste the changes to the real web.config

## Page Mocks

* [Search page with container](https://localhost:4000/Pages?mock=search-page-with-container&theme=fabrikam&debug=true&channelId=5637145359&oun=%20077&categoryId=22565426204&baseUrl=https://rushe2e-tie-sb3f7e6dfa6e7204c89ret.cloudax.test.dynamics.com/&q=dress)

## Themes

# Fabrikam themes

These are the themes used by Fabrikam:

1. **@msdyn365-commerce-theme/default** to be used for demos and verifying functionality
1. **Fabrikam** to be used to demo the Fabrikam partner in LTR markets
1. [Fabrikam RTL](./src/themes/fabrikam/fabrikam-rtl/README.md) to be used to demo the Fabrikam partner in RTL markets