# FJMC Academy — OMR Answer Sheet Checker

This is an FJMC Academy starter setup based on the OMRChecker open-source project.
It reads scanned/photo OMR answer sheets and exports detected responses for evaluation.

## Important
- This is a local Python tool, not a website that runs by uploading files to GitHub Pages.
- The sample OMR template is only an example. Configure `template.json` for the exact printed sheet you use.
- Test with a few sample sheets and manually verify results before grading students.
- Use clear, evenly lit scans/photos. Avoid cropped sheet edges, shadows, and filled bubbles that cross borders.

## Windows setup
1. Install a supported Python 3 version from https://www.python.org/downloads/ .
2. During installation, enable **Add Python to PATH**.
3. Extract this ZIP to a simple folder, for example `C:\\FJMC-OMR`.
4. Double-click `FJMC_SETUP.bat` once to install the Python packages.
5. Put scanned OMR sheet images into the `inputs` folder.
6. Configure the OMR template and evaluation files as described below.
7. Double-click `FJMC_CHECK_OMR.bat` to process the `inputs` folder.
8. Check the generated `outputs` folder and verify the result CSV.

## Configure your sheet and answer key
OMRChecker requires a template describing the layout of the exact OMR sheet:
- page dimensions and bubble dimensions
- question block type (for example, 4-option or 5-option MCQ)
- first bubble position and gaps between labels/bubbles
- any required preprocessing options

Use the upstream project guide for template setup:
https://github.com/Udayraj123/OMRChecker/wiki/User-Guide

A sample template and sample answer key are available under:
`samples/answer-key/using-csv/`

The included sample is for demonstration only; it will not automatically match an arbitrary FJMC sheet.

## Marking scheme
The sample `evaluation.json` demonstrates:
- correct answer: +1
- incorrect answer: 0
- unmarked answer: 0

Edit the marking scheme for the policy of each FJMC test. Do not assume CSIR-NET's actual marking rules unless the test's question types and marks have been configured correctly.

## Recommended FJMC workflow
1. Create a unique folder for each test, such as `inputs/CSIR_NET_MATHS_TEST_01/`.
2. Keep the answer key and evaluation settings for that test together.
3. Run the checker on a small batch first.
4. Inspect the annotated/debug outputs and compare several sheets against manual checking.
5. Export/retain the CSV and securely store student names/IDs and marks.

## Student privacy
OMR images and result files may contain student information. Restrict access, keep backups secure, and do not publish raw result files publicly.

## Upstream project and license
This package retains the original OMRChecker source and license. See `README.md` and `LICENSE`.
