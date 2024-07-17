# Gabriel's Guard
It's a simple bot for the WDR discord server. 

### Folder structure

For a easy to maintain codebase there are strict rules when it comes to the folder structure. Everything has to be in it's own place to keep it simple.

| Plugin | README |
| ------ | ------ |
| commands | Here you put all the commands logic |
| lib | This is the main folder for the engine |
| lib/config | Configuration for the bot |
| lib/decorator | Decorators to use in the business logic |
| lib/helpers | Helper functions both for the engine and the business logic |
| lib/services | Services used with inversify to use in the engine |
| lib/types | Typescript types declarations |
| loaders | Scripts for loading different modules |


### Development server

To start the development server all you have to do is run the following commands:

Install the modules.
```sh
$ npm install
```

Start the server
```sh
$ npm run start:dev
```

**IMPORTANT**:
You'll need to create an *.ENV* file with a field called *TOKEN* that contains your discord bot token and another one called *MONGO_URL* for the database connection string.
