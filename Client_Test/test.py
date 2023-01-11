#pip3 install selenium
import time
import math
import random
from selenium.common.exceptions import NoSuchElementException
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
serv_obj=Service("./chromedriver.exe")
driver = webdriver.Chrome(service=serv_obj)

#opens chrome and rotates to this website.
driver.get("http://localhost:5555/Ana-Sayfa")
time.sleep(1)

action = ActionChains(driver)
#maximizes current chrome window.
driver.maximize_window()

#I wrote a method which automatically checks the element is enabled and is displayed, returns bool
def status_check(ByWhat,element,description):
    print(element+" "+description+" is working : " + str(driver.find_element(ByWhat, element).is_enabled()))
    print(element+" "+description+" is displayed : " + str(driver.find_element(ByWhat, element).is_displayed()))

#hamburger menu only shows when window is minimizedi, setting window size 


#hamburger menu appears
time.sleep(1)
driver.set_window_size(800,768)
time.sleep(1)
description = "Hamburger Menu Button"
#hamburger menu rotating buttons 
hamburger = driver.find_element(By.CLASS_NAME,"u-svg-link")
hamburger.click()
try:
    status_check(By.ID,'Ana Sayfa2', description)
    status_check(By.ID,"Hakkimda2", description)
    status_check(By.ID,"Iletisim2", description)
    status_check(By.ID,"Login2", description)
    print("PASSED.")
except:
    print("FAILED")



""""

navigateArray = [
    "Ana Sayfa2",
    "Dragon",
    "Hakkimda2",
    "Dragon",
    "Iletisim2",
    "Dragon",
    "Login2",
    "Dragon"
]



try:
    driver.find_element(By.ID,"Ana Sayfa2").click()
    driver.find_element(By.ID,"Dragon").click()
    driver.set_window_size(800,768)
    time.sleep(111)
    hamburger.click()
    driver.find_element(By.ID,"Hakkimda2").click()
    driver.find_element(By.ID,"Dragon").click()
    driver.set_window_size(800,768)
    hamburger.click()
    driver.find_element(By.ID,"Iletisim2").click()
    driver.find_element(By.ID,"Dragon").click()
    driver.set_window_size(800,768)
    hamburger.click()
    driver.find_element(By.ID,"Login2").click()
    driver.find_element(By.ID,"Dragon").click()
    
    print("PASSED")
except(NoSuchElementException):
    print("FAILED")
time.sleep(1)


#Maximize window
driver.maximize_window()

time.sleep(1)



contact = driver.find_element(By.ID,"Iletisim")
contact.click()
name_field=driver.find_element(By.ID,"name")
mail_field=driver.find_element(By.ID,"email")
message_field=driver.find_element(By.ID,"MessageText")

name_field.send_keys("Alper Besli")
mail_field.send_keys("alper_5li@hotmail.com")
message_field.send_keys("hello again")

button=driver.find_element(By.ID,"submit")
button.click()
try:
    # It is not the same site, ID's of buttons are same :)
    returnbutton = driver.find_element(By.ID,"IletisimButton")
    print(" ______")
    print("|PASSED|")
    print(" ͞ ͞ ͞ ͞ ͞ ͞ ͞")
except (NoSuchElementException):
    print("______") 
    print("|FAILED|")
    print(" ͞ ͞ ͞ ͞ ͞ ͞ ͞")
finally:
    returnbutton.click()




def try_login(username,password):
    print("username : "+username)
    print("password :"+password)
    
    login = driver.find_element(By.ID,"Login")
    login.click()
    username_field = driver.find_element(By.ID, "username")
    password_field = driver.find_element(By.ID, "password")
    button = driver.find_element(By.ID, "submitbutton")
    username_field.send_keys(username)
    password_field.send_keys(password)
    button.click()
    try:
        returnbutton = driver.find_element(By.ID,"LoginButton")
        print("PASSED.")
        print("_______")
    except (NoSuchElementException): 
        print("FAILED.")
        print("_______")
    finally:
        returnbutton.click()
#Redirect error page if any field is empty;

login = driver.find_element(By.ID,"Login")
login.click()
username_field = driver.find_element(By.ID, "username")
password_field = driver.find_element(By.ID, "password")
button = driver.find_element(By.ID, "submitbutton")

try_login("johnwick13","")
try_login("","daisy")
try_login("","")




#Checking The Rotation links is working or not.
description = "Navbar Button"
status_check(By.ID,'Ana Sayfa', description)
status_check(By.ID,"Hakkimda", description)
status_check(By.ID,"Iletisim", description)
status_check(By.ID,"Login", description)
status_check(By.ID,'blog1', description)
status_check(By.ID,'blog2', description)
status_check(By.ID,'blog3', description)
status_check(By.ID,'toRight', description)
status_check(By.ID,'blog4', description)
status_check(By.ID,'toLeft', description)






#Checking the Logo is redirecting to Home Page or not.
#Redirecting different page for returning back to homepage test.
hakkimda = driver.find_element(By.ID,"Hakkimda")
hakkimda.click()
logo = driver.find_element(By.ID,"Dragon")
status_check(By.ID,"Dragon","Logo")
logo.click()
if(driver.find_element(By.ID,"blog1").is_displayed()):
    print("PASSED.")
else:
    print("FAILED.")



time.sleep(1)
#hamburger menu only shows when window is minimizedi, setting window size 
driver.set_window_size(1024,768)

#hamburger menu appears
time.sleep(1)
hamburger = driver.find_element(By.CLASS_NAME,"u-svg-link")
hamburger.click()
time.sleep(1)

#hamburger menu rotating buttons 
status_check(By.ID,'Ana Sayfa2', description)
status_check(By.ID,"Hakkimda2", description)
status_check(By.ID,"Iletisim2", description)
status_check(By.ID,"Login2", description)

time.sleep(1)
#Maximize window
driver.maximize_window()

time.sleep(1)

#Wrote a method for mouseOver event for verifying mouse pointer change on link.
def mouseOver():
    print("Color (185, 0, 0, 1) => RED")
    print("Color (245, 214, 84, 1) => YELLOW")
    x = driver.find_element(By.ID,"Ana Sayfa")
    action.move_to_element(x).perform()
    rgb = driver.find_element(By.ID,"Ana Sayfa").value_of_css_property('color')
    print("Ana Sayfa>"+rgb)
    time.sleep(1)
    y = driver.find_element(By.ID,"Hakkimda")
    action.move_to_element(y).perform()
    rgb = driver.find_element(By.ID,"Hakkimda").value_of_css_property('color')
    print("Hakkımda=>"+rgb)
    time.sleep(1)
    z = driver.find_element(By.ID,"Iletisim")
    action.move_to_element(z).perform()
    rgb = driver.find_element(By.ID,"Iletisim").value_of_css_property('color')
    print("İletişim=>"+rgb)
    time.sleep(1)
    t = driver.find_element(By.ID,"Login")
    action.move_to_element(t).perform()
    rgb = driver.find_element(By.ID,"Login").value_of_css_property('color')
    print("Giriş Yap =>"+rgb)
    time.sleep(1)

mouseOver()





#Wrote a method redirects automatically every single button in order to List one by one
def redirect(element):
    driver.find_element(By.ID,element).click()
    time.sleep(1)

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
message_field = driver.find_element(By.ID, "MessageText")
button = driver.find_element(By.ID, "submit")




#Testing with manual entries
name_field.send_keys("asdqwe")
time.sleep(2)

email_field.send_keys("alper.besli@st.uskudar.edu.tr")
time.sleep(2)


# due to message_field is <textarea>, it can not send keys without clicking it 
message_field.send_keys("123123213")

time.sleep(2)

button.click()
time.sleep(2)
return_button = driver.find_element(By.ID,"IletisimButton")

return_button.click()


#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

#defining method which creates completely random strings for test, complexity declares strength and complexitiy of created string.
def randomString(length,complexity,type):

    ascii_letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    digits = '0123456789'
    punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
    mailExtensions = [
  "@gmail.com",
  "@yahoo.com",
  "@hotmail.com",
  "@aol.com",
  "@hotmail.co.uk",
  "@hotmail.fr",
  "@msn.com",
  "@yahoo.fr",
  "@wanadoo.fr",
  "@orange.fr",
  "@comcast.net",
  "@yahoo.co.uk",
  "@yahoo.com.br",
  "@yahoo.co.in",
  "@live.com",
  "@rediffmail.com",
  "@free.fr",
  "@gmx.de",
  "@web.de",
  "@yandex.ru",
  "@ymail.com",
  "@libero.it",
  "@outlook.com",
  "@uol.com.br",
  "@bol.com.br",
  "@mail.ru",
  "@cox.net",
  "@hotmail.it",
  "@sbcglobal.net",
  "@sfr.fr",
  "@live.fr",
  "@verizon.net",
  "@live.co.uk",
  "@googlemail.com",
  "@yahoo.es",
  "@ig.com.br",
  "@live.nl",
  "@bigpond.com",
  "@terra.com.br",
  "@yahoo.it",
  "@neuf.fr",
  "@yahoo.de",
  "@alice.it",
  "@rocketmail.com",
  "@att.net",
  "@laposte.net",
  "@facebook.com",
  "@bellsouth.net",
  "@yahoo.in",
  "@hotmail.es",
  "@charter.net",
  "@yahoo.ca",
  "@yahoo.com.au",
  "@rambler.ru",
  "@hotmail.de",
  "@tiscali.it",
  "@shaw.ca",
  "@yahoo.co.jp",
  "@sky.com",
  "@earthlink.net",
  "@optonline.net",
  "@freenet.de",
  "@t-online.de",
  "@aliceadsl.fr",
  "@virgilio.it",
  "@home.nl",
  "@qq.com",
  "@telenet.be",
  "@me.com",
  "@yahoo.com.ar",
  "@tiscali.co.uk",
  "@yahoo.com.mx",
  "@voila.fr",
  "@gmx.net",
  "@mail.com",
  "@planet.nl",
  "@tin.it",
  "@live.it",
  "@ntlworld.com",
  "@arcor.de",
  "@yahoo.co.id",
  "@frontiernet.net",
  "@hetnet.nl",
  "@live.com.au",
  "@yahoo.com.sg",
  "@zonnet.nl",
  "@club-internet.fr",
  "@juno.com",
  "@optusnet.com.au",
  "@blueyonder.co.uk",
  "@bluewin.ch",
  "@skynet.be",
  "@sympatico.ca",
  "@windstream.net",
  "@mac.com",
  "@centurytel.net",
  "@chello.nl",
  "@live.ca",
  "@aim.com",
  "@bigpond.net.au"]

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
    if(type =="email"):
        x = random.choice(mailExtensions)
        return created_string+x
    else:
        return created_string


def checkFieldShown():
    if(driver.find_element(By.ID,"name") & driver.find_element(By.ID,"email") & driver.find_element(By.ID,"MessageText")):
        return True
    


# for automation to sending random values with different complexity, i wrote a method :

def send(complexitiyLevel):

    if (complexitiyLevel >3 or complexitiyLevel<0):
        print("Complexity level is out of range, bye.")
        return
    name_field = driver.find_element(By.ID, "name")
    email_field = driver.find_element(By.ID, "email")
    message_field = driver.find_element(By.ID, "MessageText")
    button = driver.find_element(By.ID, "submit")
    

    name = randomString(10,complexitiyLevel,"name")   
    email = randomString(20,complexitiyLevel,"email")   
    message = randomString(380,complexitiyLevel,"message")   

    print("Level => ["+str(complexitiyLevel)+"] Started.")
    print("Name : "+name)
    print("Email : "+email)
    print("Message : "+message)


    name_field.send_keys(name)
    email_field.send_keys(email)
    message_field.send_keys(message)

    try:
        button.click()
        time.sleep(5)
        return_button = driver.find_element(By.ID,"IletisimButton")
        
        
    except :
        if driver.find_element(By.ID,"IletisimButton")==False:
            print("Complexitiy Level ["+str(complexitiyLevel)+"] failed.")
            #if test failed with alert,that means input isnt accepted, page will not redirect to error or passed site so we need to clear input fields if its crashed
            if(checkFieldShown):   
                name_field.clear()
                email_field.clear()
                message_field.clear()
            
        else:
            print("Complexitiy Level ["+str(complexitiyLevel)+"] crashed.")
            

            
    else:
        if driver.find_element(By.ID,"IletisimButton"):
            print("Complexitiy Level ["+str(complexitiyLevel)+"] passed.")
            return_button.click()
        else:
            print("Complexitiy Level ["+str(complexitiyLevel)+"] failed. No Error Occured.")
            if(checkFieldShown):   
                name_field.clear()
                email_field.clear()
                message_field.clear()
            
    time.sleep(5)
    

def sendWithLength(complexitiyLevel,name_length,email_length,message_length):
    if (complexitiyLevel >3 or complexitiyLevel<0):
        print("Complexity level is out of range, bye.")
        return

    name = randomString(name_length,complexitiyLevel,"name")   
    email = randomString(email_length,complexitiyLevel,"email")   
    message = randomString(message_length,complexitiyLevel,"message")   

    print("["+str(complexitiyLevel)+"]")
    print("Name : "+name)
    print("Email : "+email)
    print("Message : "+message)


    name_field.send_keys(name)
    email_field.send_keys(email)
    message_field.send_keys(message)
    try:
        try:

            button.click()
            time.sleep(5)
            return_button = driver.find_element(By.ID,"IletisimButton")

        except:
            if driver.find_element(By.ID,"closeBtn")==False:
                print("Complexitiy Level ["+str(complexitiyLevel)+"] failed.")
            else:
                print("Complexitiy Level ["+str(complexitiyLevel)+"] crashed.")
                #if test crashed with alert,that means input isnt accepted, page will not redirect to error or passed site so we need to clear input fields if its crashed
                if(checkFieldShown):   
                    name_field.clear()
                    email_field.clear()
                    message_field.clear()
                
            
        else:
            if driver.find_element(By.ID,"closeBtn"):
                print("Complexitiy Level ["+str(complexitiyLevel)+"] passed.")
                return_button.click()
            else:
                print("Complexitiy Level ["+str(complexitiyLevel)+"] failed. No Error Occured.")
                if(checkFieldShown):   
                    name_field.clear()
                    email_field.clear()
                    message_field.clear()
    except:
        print("Error Occured [x]")
    
    
passed =0
failed =0

#sending random values which longer than before with automation  COMLPEXITY => "1" to COMPLEXITY => "3"
for x in range(1,4):
    send(x)
    

#trying to send data more longer than before 
for x in range(1,4):
    sendWithLength(x,100,200,500)


time.sleep(100)
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
            return_button.click()
            
        except:
            if driver.find_element(By.ID,"closeBtn")==False:
                print("Status ["+str(Command_List.index(command)+1)+"]: failed")
            else:
                print("Status ["+str(Command_List.index(command)+1)+"]: crashed")
                return_button.click()
      
        else:
            if driver.find_element(By.ID,"closeBtn"):
                print("Status ["+str(Command_List.index(command)+1)+"]: passed")
                return_button.click()
            else:
                print("Status ["+str(Command_List.index(command)+1)+"]: failed. No Error Occured.")
        
  """
""" 
    

    Configuration
                =>  name    : 100
                =>  email   : 200 
                =>  message : 500 
"""
#trying to send SQL Injection commands 
#Injection()




# Rapor : complexity(3)  özel karakterler bozuyor, bozan karakterler listesi : [' \t\n\r\x0b\x0c']
# Rapor : Message part can handle more than 400 chars. 




# Closes the test tab and the test ends
driver.quit()

