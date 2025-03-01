---
page:
name: generator.html
slug: /browser-mock/generator.html
---

# wf-generate

`wf-generate` is a Node.js-based generator that uses Swagger definitions and mapping files to automatically generate
mock data. This data can be used for testing APIs or as placeholders in development environments.

## Installation

To install `wf-generate`, make sure you have Node.js installed, then run the following command:

`npm install @wesflo/generator`

## Usage

### CLI

After installation, you can invoke the tool via the command line. The script will be available by default with the
command `wf-generate`.

Run the command:

` npx wf-generate `

### Configuration

The configuration is done through the `package.json` file. Here you can specify the paths to your Swagger file, mapping
files, and the target folder for the generated mock data.

Example for `package.json`:

```
{
    "wfGenerator": {
        "swagger": "mock/swagger.yaml",
        "mappings": [
        "mock/mapping.yaml",
        "mock/overwrite.yaml"
    ],
    "target": "tmp/mocks"
}
```

### Prompts

When the generator starts, you will be prompted for several inputs:

1. **Swagger file path**: The path to the Swagger file (default: `mock/swagger.yaml`).
2. **Mapping file path**: The path to the mapping file (default: `mock/mapping.yaml`).
3. **Mock data target folder**: The folder where the mock data will be saved (default: `./mocks`).
4. **Request path**: The path of the request to update (leave empty for all).
5. **Request method**: The HTTP method (GET, POST, etc.) to update.
6. **Request status**: The HTTP status code to update.

### Functionality

1. The script reads the Swagger file to extract API routes and their responses.
2. It reads the mapping files to define how the mock data should be generated.
3. It generates mock data based on the extracted API response definitions and the mappings.
4. The mock data is saved as JSON files, with filenames based on API paths, methods, and status codes.

### Mapping Types Description

In the `mapping.yaml`, different types can be used to define the structure and constraints of the generated mock data.
Below is a description of the supported types and their properties:

1. **`type: number`**
    - **Usage**: Use when the value should be a number.
    - **Properties**:
        - `length`: Specifies the length of the number (e.g., how many digits it should have).
        - `min`: The minimum value for the number.
        - `max`: The maximum value for the number.
        - `step`: The step value when iterating (e.g., 10, 20, 30, etc.).

   **Example**:
   ```
   someNumber.value:
      type: number
      length: 10
      min: 1000
      max: 9995
      step: 5
   ```

2. **`type: string`**
    - **Usage**: Use when the value should be a string.
    - **Properties**:
        - `minLength`: The minimum length of the string.
        - `maxLength`: The maximum length of the string.

   **Example**:
   ```
   someString.value:
      type: string
      minLength: 5
      maxLength: 50
   ```

3. **`type: date`**
    - **Usage**: Use when the value should be a date.
    - **Properties**:
        - `format`: The format of the date, such as `YYYY-MM-DD`, `MM-DD-YYYY`, etc.

   **Example**:
   ```
   someDate.value:
      type: date
      format: YYYY-MM-DD
   ```

4. **`type: paragraph`**
    - **Usage**: Use when the value should be a longer text (paragraph).
    - **Properties**:
        - `minLength`: The minimum number of characters in the paragraph.
        - `maxLength`: The maximum number of characters in the paragraph.

   **Example**:
   ```
   someParagraph.value:
      type: paragraph
      minLength: 20
      maxLength: 200
   ```

5. **`type: image`**
    - **Usage**: Use when the value should be an image.
    - **Properties**:
        - `width`: The width of the image.
        - `height`: The height of the image.

   **Example**:
   ```
   productImage.value:
      type: image
      width: 200
      height: 400
   ```

6. **`type: currency`**
    - **Usage**: Use when the value should represent a currency.
    - **Properties**:
        - `min`: The minimum value for the currency.
        - `max`: The maximum value for the currency.

   **Example**:
   ```
   someCurrency.value:
      type: currency
      min: 5.00
      max: 1000.00
   ```

### Summary

In `mapping.yaml`, you can define different data types such
as `number`, `string`, `date`, `paragraph`, `image`, `currency`, and `link`. Each type has specific properties that you
can adjust to generate the mock data that fits your needs. For example, for a `number` type, you can define its length,
range, and step, while for a `string` type, you can set its minimum and maximum length.

These types provide flexibility in generating mock data that precisely matches your requirements.

### Example Mapping File (`mapping.yaml`)

```
someKey.value:
    type: number
    length: 10
anotherKey.value:
    type: string
    minLength: 5
    maxLength: 50
yetAnotherKey.value:
    type: date
    format: YYYY-MM-DD
```

### Example Overwrite File (`overwrite.yaml`)

```
someKey.value:
    type: number
    length: 100
```
