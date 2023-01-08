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
driver.get("http://localhost:5555/Ana-Sayfa")
time.sleep(3)

#maximizes current chrome window.
driver.maximize_window()

#I wrote a method which automatically checks the element is enabled and is displayed, returns bool
def status_check(ByWhat,element,description):
    print(element+" "+description+" is working : " + str(driver.find_element(ByWhat, element).is_enabled()))
    print(element+" "+description+" is displayed : " + str(driver.find_element(ByWhat, element).is_displayed()))


#Checking The Rotation links is working or not.
description = "Navbar Button"
status_check(By.ID,'Ana Sayfa', description)
status_check(By.ID,"Hakkimda", description)
status_check(By.ID,"Iletisim", description)
status_check(By.ID,"Login", description)

time.sleep(4)
#hamburger menu only shows when window is minimizedi, setting window size 
driver.set_window_size(1024,768)

#hamburger menu appears
time.sleep(4)
hamburger = driver.find_element(By.CLASS_NAME,"u-svg-link")
hamburger.click()
time.sleep(4)

#hamburger menu rotating buttons 
status_check(By.ID,'Ana Sayfa2', description)
status_check(By.ID,"Hakkimda2", description)
status_check(By.ID,"Iletisim2", description)
status_check(By.ID,"Login2", description)

time.sleep(4)
#Maximize window
driver.maximize_window()

time.sleep(4)


#Wrote a method redirects automatically every single button in order to List one by one
def redirect(element):
    driver.find_element(By.ID,element).click()
    time.sleep(2)

navigateArray = [
    "blog1",
    "Ana Sayfa",
    "blog2",
    "Ana Sayfa",
    "blog3",
    "Ana Sayfa",
    "toRight",
    "blog4",
    "Ana Sayfa",
    "Hakkimda",
    "Iletisim",
    "Login",
    "Iletisim"
]

for id in navigateArray:
    redirect(id)


#Checking input fields and submit button is enabled and displayed or not.
description = "field"
status_check(By.ID,"name", description)
status_check(By.ID,"email", description)
status_check(By.ID,"message", description)


#Entering random values into input fields and submit 
name_field = driver.find_element(By.ID, "name")
email_field = driver.find_element(By.ID, "email")
message_field = driver.find_element(By.ID, "message")
button = driver.find_element(By.ID, "submit")

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


#Testing with manual entries
name_field.send_keys("@æß>£#>£$")
time.sleep(2)

email_field.send_keys("alper.besli@st.uskudar.edu.tr")
time.sleep(2)


# due to message_field is <textarea>, it can not send keys without clicking it 
driver.find_element(By.ID, "message").send_keys("123123213")

time.sleep(2)

button.click()
time.sleep(10)

#defining method which creates completely random strings for test, complexity declares strength and complexitiy of created string.
def randomString(length,complexity):

    ascii_letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    digits = '0123456789'
    punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
    whitespace = " \t\n\r\x0b\x0c"
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
    if (complexitiyLevel >3 or complexitiyLevel<0):
        print("Complexity level is out of range, bye.")
        return
    name_field.clear()
    email_field.clear()
    message_field.clear()


    name = randomString(10,complexitiyLevel)   
    email = randomString(20,complexitiyLevel)   
    message = randomString(380,complexitiyLevel)   

    print("["+str(complexitiyLevel)+"]")
    print("Name : "+name)
    print("Email : "+email)
    print("Message : "+message)


    name_field.send_keys(name)
    email_field.send_keys(email)
    message_field.send_keys(message)

    try:
        button.click()
        time.sleep(5)
        
    except:
        if driver.find_element(By.ID,"closeBtn")==False:
            print("Complexitiy Level ["+str(complexitiyLevel)+"] failed.")
        else:
            print("Complexitiy Level ["+str(complexitiyLevel)+"] crashed.")
            close_button.click()
    else:
        if driver.find_element(By.ID,"closeBtn"):
            print("Complexitiy Level ["+str(complexitiyLevel)+"] passed.")
            close_button.click()
        else:
            print("Complexitiy Level ["+str(complexitiyLevel)+"] failed. No Error Occured.")
    time.sleep(5)

def sendWithLength(complexitiyLevel,name_length,email_length,message_length):
    if (complexitiyLevel >3 or complexitiyLevel<0):
        print("Complexity level is out of range, bye.")
        return
    name_field.clear()
    email_field.clear()
    message_field.clear()


    name = randomString(name_length,complexitiyLevel)   
    email = randomString(email_length,complexitiyLevel)   
    message = randomString(message_length,complexitiyLevel)   

    print("["+str(complexitiyLevel)+"]")
    print("Name : "+name)
    print("Email : "+email)
    print("Message : "+message)


    name_field.send_keys(name)
    email_field.send_keys(email)
    message_field.send_keys(message)
    
    try:

        button.click()
        time.sleep(5)
    except:
        if driver.find_element(By.ID,"closeBtn")==False:
            print("Complexitiy Level ["+str(complexitiyLevel)+"] failed.")
        else:
            print("Complexitiy Level ["+str(complexitiyLevel)+"] crashed.")
            close_button.click()
    else:
        if driver.find_element(By.ID,"closeBtn"):
            print("Complexitiy Level ["+str(complexitiyLevel)+"] passed.")
            close_button.click()
        else:
            print("Complexitiy Level ["+str(complexitiyLevel)+"] failed. No Error Occured.")
    
    


#sending random values which longer than before with automation  COMLPEXITY => "1" to COMPLEXITY => "3"
for x in range(1,4):
    
    send(x)
    

#trying to send data more longer than before 
for x in range(1,4):
    sendWithLength(x,100,200,500)

#I wrote a method which automatically tries SQL Injections to input fields individually.
def Injection():
    Command_List = [
        "1'1",
        "1 exec sp_ (or exec xp_)",
        "1 and 1=1",
        "1' and 1=(select count(*) from tablenames); --",
        "1 or 1=1",
        "1' or '1'='1",
        "1or1=1",
        "1'or'1'='1",
        "fake@ema'or'il.nl'='il.nl"
        ]
    for command in Command_List:
        name_field.send_keys(command)
        email_field.send_keys(command)
        message_field.send_keys(command)
        print("")
        print("Trying to Inject ["+command+"]")
        try:
            button.click()
            time.sleep(5)
            
        except:
            if driver.find_element(By.ID,"closeBtn")==False:
                print("Status ["+str(Command_List.index(command)+1)+"]: failed")
            else:
                print("Status ["+str(Command_List.index(command)+1)+"]: crashed")
                close_button.click()
      
        else:
            if driver.find_element(By.ID,"closeBtn"):
                print("Status ["+str(Command_List.index(command)+1)+"]: passed")
                close_button.click()
            else:
                print("Status ["+str(Command_List.index(command)+1)+"]: failed. No Error Occured.")
        
  
""" 
    

    Configuration
                =>  name    : 100
                =>  email   : 200 
                =>  message : 500 
"""
#trying to send SQL Injection commands 
Injection()



# Rapor : complexity(3)  özel karakterler bozuyor, bozan karakterler listesi : [' \t\n\r\x0b\x0c']
# Rapor : Message part can handle more than 400 chars. 




# Closes the test tab and the test ends
driver.quit()

