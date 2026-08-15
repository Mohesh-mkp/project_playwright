Feature: Amazon login
  As a registered user
  I want to log in to Amazon
  So that I can access my account

   @smoke @regression
    Scenario: Successful login with valid credentials
        Given the user is on the Amazon sign-in page
        When the user enters a valid email or mobile number "cxtuser952@gmail.com"
        And the user clicks the Continue button
        And the user enters a valid password "Test123"
        And the user clicks the Sign-In button
        Then the user should be redirected to the Amazon homepage
        And the user should see the account name
        And the user should be able to log out successfully

