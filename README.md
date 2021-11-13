# Super Transportation Co.

Follow the steps below to install the package inside your local environment.

## Schema
![ER-Diagram](/images/ER-Diagram.png)

## Installation

1. Clone the code into your local machine. From command line type `git clone https://github.com/raksh36/SuperTransportationCo.git`
2. Enable Dev Hub from your personal developer environment.
3. Open the project in VS Code and authorize your dev environment.
4. Create a scratch org from command pallete using `SFDX:Create a Default Scratch Org`
5. Push the changes to scratch org. Open scratch org and Go inside Sales app to check tabs visible inside.

## Usage and testing

1. Go inside Garage, Bus tabs to create sample records. Use [Location](https://www.latlong.net/) to fill in dummy data on location fields.
2. Go inside 'Bus Fleet and Details' tab to see the results. Test if it updates Resale Value as expected.
3. To test nightly maintenance checks - go to hello.apex under scripts\apex in VS Code and run `SFDX: Execute Anonymous Apex with Currently Selected Text` under command pallete.

