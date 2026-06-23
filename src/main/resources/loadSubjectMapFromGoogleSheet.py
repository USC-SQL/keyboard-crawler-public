import sys
import requests

urlToGoogleSheetFile = sys.argv[2]

response = requests.get(urlToGoogleSheetFile)
assert response.status_code == 200, 'Wrong status code'
# print(response.content)


outputCsvFile = sys.argv[1]
# print(outputCsvFile)


if response.content:
    with open(outputCsvFile, 'wb') as f:  # '/home/paul-sql/eclipse-workspace2/knfg/src/main/resources/out.csv'
        f.write(response.content)
    print('Done loading main mapping as CSV from Google Sheet')
