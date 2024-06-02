# Web 3 Template Project for sCrypt Smart Contracts

This is a Web 3 Template Project for sCrypt Smart Contracts om BMV

# To Set the Project Up:

The following instructions will help you to setup the project from the current repo:

   ```
 Clone repo:

		git clone https://github.com/carlosamcruz/Web3Template
		cd Web3Template

 Create a new React Project:

		npx create-react-app webhelloworld --template typescript
		cd webhelloworld
		npx scrypt-cli@latest init

			***In case its necessary apply the following commands:

			git init
			git add .
			git commit -m "Initialize project using Creat React App"
			npx scrypt-cli@latest init

	Delete from node_mudules folders:

		..\node_modules\bsv
		..\node_modules\scrypt-ts
		..\node_modules\node-polyfill-webpack-plugin   

	Copy from crack_scrypt_0.1.73 foder (in this repo)

		..\crack_scrypt_0.1.73\bsv
		..\crack_scrypt_0.1.73\scrypt-ts
		..\crack_scrypt_0.1.73\node-polyfill-webpack-plugin
		..\crack_scrypt_0.1.73\filter-obj   
  
	Paste the four folders above into node_modules

		..\node_modules\bsv
		..\node_modules\scrypt-ts
		..\node_modules\node-polyfill-webpack-plugin
		..\node_modules\filter-obj

	Install:

		npm install scrypt-ts-lib		//https://github.com/sCrypt-Inc/scrypt-ts-lib


	Delete from projeto folder webhelloworld:

		..\webhelloworld\scr

	Copy folder (in this repo):

		src

	Paste it into project folder:

		..\webhelloworld\scr   

	Compile the Project Contracts:

		npx scrypt-cli@latest compile

	Run it in your pc:

		npm start   

   ```

"# Web 3 Template Project for sCrypt Smart Contracts" 
