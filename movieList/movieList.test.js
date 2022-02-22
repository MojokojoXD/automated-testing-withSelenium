const {Builder,Capabilities,By} = require('selenium-webdriver');
require('chromedriver');
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();


beforeAll(async () => {
    await driver.get('http://127.0.0.1:5500/movieList/index.html');
})


afterAll(async () => {
    await driver.quit();
})

async function addMultiple(movieArr){
    for(let i = 0 ; i < movieArr.length; i++){
        const inputBar = await driver.findElement(By.css("input")).sendKeys(movieArr[i]);

        await driver.sleep(2000);

        const button = await driver.findElement(By.xpath('//form/button')).click();

        await driver.sleep(3000);

    }
}

async function deleteMovies(movieArr){
    for (let i = 0; i < movieArr.length; i++){
        let movieName = movieArr[i].replace(/\s+/g, '');
        const xButton = await driver.findElement(By.xpath(`//*[@id = "${movieName}"]`)).click;
    }
}

const movieArr = ['King kong','Avengers','Planets of the Apes'];


describe('A series of test for movieList website',() => {
    test('adding movie', async () => {
        const inputBar = await driver.findElement(By.css("input")).sendKeys('Planet of the Apes');

        await driver.sleep(2000);

        const button = await driver.findElement(By.xpath('//form/button')).click();

        await driver.sleep(3000);

    })

    test('delete movie', async () => {
        const deleteButton = await driver.findElement(By.xpath('//*[@id = "PlanetoftheApes"]')).click();

        await driver.sleep(3000);
    })


    test('add multiple movies', async() =>{

        await addMultiple(movieArr);
    });
    
    test('delete multiple movies', async() => {
        for (let i = 0; i < movieArr.length; i++){
        const deleteButton = await driver.findElement(By.xpath(`//*[@id = "${movieArr[i].replace(/\s+/g, '')}"]`)).click();

        await driver.sleep(3000);
        }
    })
})