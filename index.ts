import puppeteer, { Browser } from "puppeteer";

const URL = "https://books.toscrape.com/";

const main = async () => {
  const browser: Browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(URL);
  const bookData = await page.evaluate(() => {
    const books = Array.from(document.querySelectorAll(".product_pod"));
    // return books;
    return books.map((book: any) => {
      const title = book.querySelector("h3 a").title;
      const price = book.querySelector(".price_color").textContent;
      return {
        title,
        price,
      };
    });
  });
  console.log(bookData);
  await browser.close();
};

main();
