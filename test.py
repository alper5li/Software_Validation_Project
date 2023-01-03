#pip3 install selenium
import time
import math
import random
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service

serv_obj=Service("./chromedriver.exe")
driver = webdriver.Chrome(service=serv_obj)

#opens chrome and rotates to this website.
driver.get("https://astronomy74.github.io/SteelBros/index.html")

#maximizes current chrome window.
driver.maximize_window()

#Checking The Rotation (href) links is working or not.
print("Forging Services href link is working : " + str(driver.find_element(By.LINK_TEXT, "Forging Services").is_enabled()))
print("Forging Services href link displayed : " + str(driver.find_element(By.LINK_TEXT, "Forging Services").is_displayed()))

print("About Us href link is working : " + str(driver.find_element(By.LINK_TEXT, "About Us").is_enabled()))
print("About Us href link displayed : " + str(driver.find_element(By.LINK_TEXT, "About Us").is_displayed()))

print("Industries href link is working : " + str(driver.find_element(By.LINK_TEXT, "Industries").is_enabled()))
print("Industries href link displayed : " + str(driver.find_element(By.LINK_TEXT, "Industries").is_displayed()))


print("Contact Us href link is working : " + str(driver.find_element(By.LINK_TEXT, "Contact Us").is_enabled()))
print("Contact Us href link displayed : " + str(driver.find_element(By.LINK_TEXT, "Contact Us").is_displayed()))

#Clicks to Contact Us link and redirects to contact form
print("Contact Us clicked ... ") 
driver.find_element(By.LINK_TEXT, "Contact Us").click()
time.sleep(4)

#Checking input fields and submit button is enabled and displayed or not.
print("Name field is enabled : " + str(driver.find_element(By.ID, "name").is_enabled()))
print("Name field is displayed : " + str(driver.find_element(By.ID, "name").is_displayed()))

print("Email field is enabled : " + str(driver.find_element(By.ID, "email").is_enabled()))
print("Email field is displayed : " + str(driver.find_element(By.ID, "email").is_displayed()))

print("Message field is enabled : " + str(driver.find_element(By.ID, "message").is_enabled()))
print("Message field is displayed : " + str(driver.find_element(By.ID, "message").is_displayed()))

print("Submit button is enabled : " + str(driver.find_element(By.ID, "button").is_enabled()))
print("Submit button is displayed : " + str(driver.find_element(By.ID, "button").is_displayed()))


#Entering random values into input fields and submit 
name_field = driver.find_element(By.ID, "name")
email_field = driver.find_element(By.ID, "email")
message_field = driver.find_element(By.ID, "message")
button = driver.find_element(By.ID, "button")

name_field.send_keys("@æß>£#>£$")
email_field.send_keys("alper.besli@st.uskudar.edu.tr")
message_field.send_keys("my password is ....")

time.sleep(4)
#name_field.click()
time.sleep(2)




#defining method which creates completely random strings for test, complexity declares strength and complexitiy of created string.
def randomString(length,complexity):

    ascii_letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    digits = '0123456789'
    punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
    whitespace = ' \t\n\r\x0b\x0c'
    if complexity == 1:
        all = ascii_letters + digits 
    elif complexity == 2:
        all = ascii_letters + digits + punctuation
    elif complexity ==3:
        all = ascii_letters + digits + punctuation + whitespace    

    created_string =""
    for count in range(length):

        num = (random.randint(0,length)) % len(all)
        created_string += all[num]
    return created_string




# for automation to sending random values with different complexity, i wrote a method :

def send(complexitiyLevel):
    if (complexitiyLevel >4 or complexitiyLevel<0):
        print("Complexity level is out of range, bye.")
        return
    name_field.clear()
    email_field.clear()
    message_field.clear()


    name = randomString(10,complexitiyLevel)   
    email = randomString(20,complexitiyLevel)   
    message = randomString(380,complexitiyLevel)   

    print("")
    print("Name : "+name)
    print("Email : "+email)
    print("Message : "+message)


    name_field.send_keys(name)
    email_field.send_keys(email)
    message_field.send_keys(message)
    print("Complexitiy Level ["+str(complexitiyLevel)+"] passed.")
    time.sleep(5)

def sendWithLength(complexitiyLevel,name_length,email_length,message_length):
    if (complexitiyLevel >4 or complexitiyLevel<0):
        print("Complexity level is out of range, bye.")
        return
    name_field.clear()
    email_field.clear()
    message_field.clear()


    name = randomString(name_length,complexitiyLevel)   
    email = randomString(email_length,complexitiyLevel)   
    message = randomString(message_length,complexitiyLevel)   

    print("")
    print("Name : "+name)
    print("Email : "+email)
    print("Message : "+message)


    name_field.send_keys(name)
    email_field.send_keys(email)
    message_field.send_keys(message)
    print("Complexitiy Level ["+str(complexitiyLevel)+"] passed.") 
    time.sleep(5)


#sending random values which longer than before with automation  COMLPEXITY => "1" to COMPLEXITY => "3"
for x in range(1,4):
    send(x)

""" trying to send data more longer than before 

     Configuration
                =>  name    : 100
                =>  email   : 200 
                =>  message : 500 
"""
for x in range(1,4):
    sendWithLength(x,100,200,500)

# Rapor : complexity(3) Çalışıyor ancak sistemi bozuyor, direkt submit ediyor. özel karakterler bozuyor




# Closes the test tab and the test ends
driver.quit()

