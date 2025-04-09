import * as pulumi from "@pulumi/pulumi";
import * as azure from "@pulumi/azure-native";
import * as child_process from "child_process";

const targetedStackName = "mtan/B-6927-test/dev";
console.log(`Targeted Stack: ${targetedStackName}`);

function stackExists(targetedStackName: string): boolean {
  try {
    child_process.execSync(
      `pulumi stack select ${targetedStackName} --non-interactive`,
      {
        stdio: "ignore",
      }
    );
    return true;
  } catch {
    return false;
  }
}
console.log(`Does stack ${targetedStackName} exist?: ${stackExists(targetedStackName)}`);

async function main() {
  if (!stackExists(targetedStackName)) {
    console.log(`${targetedStackName} does not exist. Will retry on next deployment.`);
    return;
  }
  const stackRef = new pulumi.StackReference(targetedStackName);
  const frontDoorId = stackRef.getOutput("frontDoorId");
  const resourceGroupA = new azure.resources.ResourceGroup("example-rg-a");
  const storageAccount = new azure.storage.StorageAccount("examplestorage", {
    resourceGroupName: resourceGroupA.name,
    sku: {
      name: "Standard_LRS",
    },
    kind: "StorageV2",
  });
  const storageContainer = new azure.storage.BlobContainer("examplecontainer", {
    resourceGroupName: resourceGroupA.name,
    accountName: storageAccount.name,
    publicAccess: azure.storage.PublicAccess.None,
  });
}

main();
