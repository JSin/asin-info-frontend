# Search ASIN and retrieve basic data from Amazon. (Technical Assessment)

## Supported Node Version
* NodeJS => 10.13.0

## Assumptions
* Because ASIN data must always be up to date and there is no easy way to verify if the data is up to date, you always have to query the source.
* Decided against letting client query Amazon, parse, and upload results to DB in the fear of the user sending invalid data.
* All features fit on one page on all screens so application is automatically reactive.
* Just stuck with the react favicon
* You can tell I am not UI/UX Designer
* In a React application, I would break up components and containers but due to the simplicity I have left everything in source.
