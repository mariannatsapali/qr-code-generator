import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

inquirer
  .prompt([{ Message: "Type in your URL: ", name: "URL" }])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("qr-code.png"));
    // Save the URL to a text file
    fs.writeFile('./URL.txt', url, (err) => {
        if (err) {
          console.error("Error writing to the file:", err);
        } else {
          console.log("URL saved to URL.txt");
        }
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something went wrong");
    }
  });
