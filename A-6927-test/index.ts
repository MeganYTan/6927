import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";

async function main() {
    try {
        const stackRef = new pulumi.StackReference("mtan/B-6927-test/dev");
        const frontDoorId = stackRef.getOutput("frontDoorId");

        const resourceGroupA = new azure.resources.ResourceGroup("example-rg-a");

        const apiManagementService = new azure.apimanagement.ApiManagementService("apiManagementService", {
            resourceGroupName: resourceGroupA.name,
            publisherEmail: "example@example.com",
            publisherName: "Example Publisher",
            sku: {
                capacity: 1,
                name: "Developer"
            },
            enableClientCertificate: true
            // Assuming frontDoorId is used in some property
        });
    } catch (error) {
        console.log("Stack B-6927-test does not exist yet. Will retry on next deployment.");
    }
}

main();