import puppeteer, { Browser } from "puppeteer";

const URL = "https://books.toscrape.com/";

const main = async () => {
  const browser: Browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(URL);
  const bookData = await page.evaluate(() => {
    const convertPrice = (price: string) => {
      const priceString = price.replace("£", "");
      return parseFloat(priceString);
    };
    const books = Array.from(document.querySelectorAll(".product_pod"));
    const data = books.map((book: any) => ({
      title: book.querySelector("h3")?.textContent,
      price: convertPrice(book.querySelector(".price_color")?.textContent),
      imgUrl: book.querySelector("img")?.src,
      rating: book.querySelector(".star-rating")?.classList[1],
    }));
    return data;
  });
  console.log(bookData);
  await browser.close();
};

main();
