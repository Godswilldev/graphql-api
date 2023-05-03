import { Plugin } from "@nestjs/apollo";
import { ApolloServerPlugin, GraphQLRequestListener } from "@apollo/server";

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  async requestDidStart(): Promise<GraphQLRequestListener<any>> {
    console.log("Request started");
    return {
      async willSendResponse() {
        console.log("Will send response");
      },
    };
  }
}
