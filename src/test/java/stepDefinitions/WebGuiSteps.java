package stepDefinitions;

import io.cucumber.java.en.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

public class WebGuiSteps {

    WebDriver driver;

    @Given("I open Decathlon Web GUI")
    public void openApplication() {

        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();

        driver.get("http://localhost:8080");
    }


    @Then("the page should display {string}")
    public void thePageShouldDisplay(String expectedText) {
        String actualText = driver.findElement(By.tagName("h1")).getText();

        if (!actualText.equals(expectedText)) {
            throw new AssertionError(
                    "Expected text: " + expectedText + " but fount: " + actualText);


        }
    }
}