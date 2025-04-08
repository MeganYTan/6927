// Stack B-6927-test (Azure Front Door)
import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

const resourceGroupB = new azure.resources.ResourceGroup("example-rg-b");

const frontDoor = new azure.cdn.Profile("exampleFrontDoor", {
    resourceGroupName: resourceGroupB.name,
    sku: {
        name: "Standard_AzureFrontDoor"
    }
    // other properties
});

export const frontDoorId = frontDoor.id;