import AWS from 'aws-sdk';

class ModuleRegistry {
  private dynamoDb: AWS.DynamoDB.DocumentClient;

  ModuleRegistry() {
    AWS.config.update({ region: 'us-east-1' });
    this.dynamoDb = new AWS.DynamoDB.DocumentClient();
  }

  async GetAllModules(): Promise<ModuleMetadata[]> {
    const data = await this.dynamoDb
      .scan({
        TableName: 'VRCFT-Module-Entries',
      })
      .promise();

    return data.Items as ModuleMetadata[];
  }

  async GetAllOwnedModules(ownerId: number): Promise<ModuleMetadata[]> {
    const data = await this.dynamoDb
      .scan({
        FilterExpression: 'OwnerId = :ownerId',
        ExpressionAttributeValues: {
          ':ownerId': { N: ownerId },
        },
        TableName: 'VRCFT-Module-Entries',
      })
      .promise();

    return data.Items as ModuleMetadata[];
  }
}
