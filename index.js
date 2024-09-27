#!/usr/bin/env node

const { Command } = require("commander");
const program = new Command();

// Helper function to generate password
function generatePassword(length, options) {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+{}[]";

  let characters = lowercase;

  if (options.uppercase) characters += uppercase;
  if (options.numbers) characters += numbers;
  if (options.symbols) characters += symbols;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return password;
}

// Set up the CLI commands and options
program
  .version("1.0.0")
  .description("A simple CLI to generate passwords")
  .option("-l, --length <number>", "length of the password", 8) // Default length is 8
  .option("-n, --numbers", "include numbers in the password")
  .option("-u, --uppercase", "include uppercase letters in the password")
  .option("-s, --symbols", "include symbols in the password")
  .option("-h, --help", "display help for command")
  .action((options) => {
    const length = parseInt(options.length);

    if (isNaN(length) || length <= 0) {
      console.error("Invalid length provided.");
      process.exit(1);
    }

    const password = generatePassword(length, options);
    console.log(`Generated Password: ${password}`);
  });

// Parse the command-line arguments
program.parse(process.argv);

if (process.argv.length < 3) {
  program.outputHelp();
}
