package stepDefinitions;

import io.cucumber.java.en.*;
import org.junit.jupiter.api.Assertions;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.support.ui.Select;

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

    @When("I enter the competitors name {string}")
    public void iEnterTheCompetitorsName(String name) {
        driver.findElement(By.id("name2")).sendKeys(name);
    }

    @And("I choose the event {string}")
    public void iChooseTheEvent(String event) {
        Select eventDropDown = new Select(driver.findElement(By.id("event")));
        eventDropDown.selectByVisibleText(event);
    }

    @And("I enter the result {double}")
    public void iEnterTheResult(double result) {
        driver.findElement(By.id("raw")).sendKeys(String.valueOf(result));
    }

    @Then("the system shall display the score {int}")
    public void theSystemShallDisplayTheScore(int expectedScore) {
        String totalScore = driver.findElement(By.id("")).getText();
        int actualScore = Integer.parseInt(totalScore);
        Assertions.assertEquals(expectedScore, actualScore);
    }

}