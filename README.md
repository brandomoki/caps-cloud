# caps-cloud

Created a cloud Parcel service using AWS SQS, SNS, Lambda

## Author

Brandon Pitts

## Functionality

SNS Topic: pickup which will receive all pickup requests from vendors
SQS Queue (FIFO): packages which will contain all delivery requests from vendors, in order of receipt.
Subscribe this queue to the pickup topic so all pickups are ordered
SQS Queue (Standard) for each vendor (named for the vendor) which will contain all delivery notifications from the drivers

## How to use

node vendor.js
node driver.js

## Credits and Collaborators

Demo code, Tyler main, Luis Rosales
