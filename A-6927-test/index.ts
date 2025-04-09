import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

const stackRef = new pulumi.StackReference("mtan/B-6927-test/dev");
console.log("Stack ref: ", stackRef);

async function main() {
    if (!stackRef) {
        console.log("Stack B-6927-test does not exist yet. Will retry on next deployment.");
        return;
    }
    // Check if the stack reference exists
    try {
        const frontDoorId = stackRef.getOutput("frontDoorId");

        const resourceGroupA = new azure.resources.ResourceGroup("example-rg-a");

        const storageAccount = new azure.storage.StorageAccount("examplestorage", {
            resourceGroupName: resourceGroupA.name,
            sku: {
                name: "Standard_LRS"
            },
            kind: "StorageV2"
        });

        const storageContainer = new azure.storage.BlobContainer("examplecontainer", {
            resourceGroupName: resourceGroupA.name,
            accountName: storageAccount.name,
            publicAccess: azure.storage.PublicAccess.None
        });

    } catch (error) {
        console.log("Stack B-6927-test does not exist yet. Will retry on next deployment.");
    }
}

main();
