Feature: Web GUI basic functionality

  Scenario: Open Decathlon Web GUI
    Given I open Decathlon Web GUI
    Then the page should display "Decathlon Web MVP"



Feature: Verify result input (normal and limits) in Web GUI

  Scenario Outline: Verify input and score at [Enter result]
    Given I open Decathlon Web GUI
    When I enter the competitors name "<name>"
    And I choose the event "<event>"
    And I enter the result <result>
    Then the system shall display the score <expected_score>

    Examples: Decathlon 100m (Gränser: 5 - 20)
      | name | event | result | expected_score | kommentar          |
      | Anna | 100m  | 12.50  | 556            | Normalvärde        |
      | Anna | 100m  | 5      | 2640           | Gränsvärde (Lower) |
      | Anna | 100m  | 20     | 0              | Gränsvärde (Upper) |

    Examples: Decathlon 110m hurdles (Gränser: 10 - 30)
      | name | event        | result | expected_score | kommentar          |
      | Anna | 110m hurdles | 15.00  | 850            | Normalvärde        |
      | Anna | 110m hurdles | 10     | 1556           | Gränsvärde (Lower) |
      | Anna | 110m hurdles | 30     | 0              | Gränsvärde (Upper) |

    Examples: Decathlon 400m (Gränser: 20 - 100)
      | name | event | result | expected_score | kommentar          |
      | Anna | 400m  | 50     | 815            | Normalvärde        |
      | Anna | 400m  | 20     | 2698           | Gränsvärde (Lower) |
      | Anna | 400m  | 100    | 0              | Gränsvärde (Upper) |

    Examples: Decathlon 1500m (Gränser: 150 - 400)
      | name | event | result | expected_score | kommentar          |
      | Anna | 1500m | 250    | 881            | Normalvärde        |
      | Anna | 1500m | 150    | 1719           | Gränsvärde (Lower) |
      | Anna | 1500m | 400    | 124            | Gränsvärde (Upper) |

    Examples: Decathlon Discus (Gränser: 0 - 85)
      | name | event  | result | expected_score | kommentar          |
      | Anna | Discus | 40     | 665            | Normalvärde        |
      | Anna | Discus | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Discus | 85     | 1622           | Gränsvärde (Upper) |

    Examples: Decathlon High jump (Gränser: 0 - 300)
      | name | event     | result | expected_score | kommentar          |
      | Anna | High jump | 190    | 714            | Normalvärde        |
      | Anna | High jump | 0      | 0              | Gränsvärde (Lower) |
      | Anna | High jump | 300    | 1852           | Gränsvärde (Upper) |

    Examples: Decathlon Javelin (Gränser: 0 - 110)
      | name | event   | result | expected_score | kommentar          |
      | Anna | Javelin | 60     | 738            | Normalvärde        |
      | Anna | Javelin | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Javelin | 110    | 1513           | Gränsvärde (Upper) |

    Examples: Decathlon Long jump (Gränser: 0 - 1000)
      | name | event     | result | expected_score | kommentar          |
      | Anna | Long jump | 700    | 814            | Normalvärde        |
      | Anna | Long jump | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Long jump | 1000   | 1606           | Gränsvärde (Upper) |

    Examples: Decathlon Pole vault (Gränser: 0 - 1000)
      | name | event      | result | expected_score | kommentar          |
      | Anna | Pole vault | 500    | 910            | Normalvärde        |
      | Anna | Pole vault | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Pole vault | 1000   | 2722           | Gränsvärde (Upper) |

    Examples: Decathlon Shot put (Gränser: 0 - 30)
      | name | event    | result | expected_score | kommentar          |
      | Anna | Shot put | 15     | 790            | Normalvärde        |
      | Anna | Shot put | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Shot put | 30     | 1731           | Gränsvärde (Upper) |

    Examples: Heptathlon 100m hurdles (Gränser: 10 - 30)
      | name | event        | result | expected_score | kommentar          |
      | Anna | 100m hurdles | 15.00  | 842            | Normalvärde        |
      | Anna | 100m hurdles | 10     | 1617           | Gränsvärde (Lower) |
      | Anna | 100m hurdles | 30     | 0              | Gränsvärde (Upper) |

    Examples: Heptathlon 200m (Gränser: 20 - 100)
      | name | event | result | expected_score | kommentar          |
      | Anna | 200m  | 25.00  | 887            | Normalvärde        |
      | Anna | 200m  | 20     | 1398           | Gränsvärde (Lower) |
      | Anna | 200m  | 100    | 0              | Gränsvärde (Upper) |

    Examples: Heptathlon 800m (Gränser: 70 - 250)
      | name | event | result | expected_score | kommentar          |
      | Anna | 800m  | 130    | 965            | Normalvärde        |
      | Anna | 800m  | 70     | 2026           | Gränsvärde (Lower) |
      | Anna | 800m  | 250    | 1              | Gränsvärde (Upper) |

    Examples: Heptathlon High jump (Gränser: 0 - 300)
      | name | event     | result | expected_score | kommentar          |
      | Anna | High jump | 170    | 855            | Normalvärde        |
      | Anna | High jump | 0      | 0              | Gränsvärde (Lower) |
      | Anna | High jump | 300    | 2733           | Gränsvärde (Upper) |

    Examples: Heptathlon Javelin (Gränser: 0 - 110)
      | name | event   | result | expected_score | kommentar          |
      | Anna | Javelin | 45     | 763            | Normalvärde        |
      | Anna | Javelin | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Javelin | 110    | 2045           | Gränsvärde (Upper) |

    Examples: Heptathlon Long jump (Gränser: 0 - 1000)
      | name | event     | result | expected_score | kommentar          |
      | Anna | Long jump | 600    | 850            | Normalvärde        |
      | Anna | Long jump | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Long jump | 1000   | 2299           | Gränsvärde (Upper) |

    Examples: Heptathlon Shot put (Gränser: 0 - 30)
      | name | event    | result | expected_score | kommentar          |
      | Anna | Shot put | 12     | 661            | Normalvärde        |
      | Anna | Shot put | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Shot put | 30     | 1887           | Gränsvärde (Upper) |



Scenario: Verify result input (normal and limits) in Web GUI

  Scenario Outline: Verify input and score at [Enter result]
    Given I open Decathlon Web GUI
    When I enter the competitors name "<name>"
    And I choose the event "<event>"
    And I enter the result <result>
    Then the system shall display the score <expected_score>

    Examples: Decathlon 100m (Gränser: 5 - 20)
      | name | event | result | expected_score | kommentar          |
      | Anna | 100m  | 12.50  | 556            | Normalvärde        |
      | Anna | 100m  | 5      | 2640           | Gränsvärde (Lower) |
      | Anna | 100m  | 20     | 0              | Gränsvärde (Upper) |

    Examples: Decathlon Long jump (Gränser: 0 - 1000)
      | name | event     | result | expected_score | kommentar          |
      | Anna | Long jump | 700    | 814            | Normalvärde        |
      | Anna | Long jump | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Long jump | 1000   | 1606           | Gränsvärde (Upper) |

    Examples: Decathlon Shot put (Gränser: 0 - 30)
      | name | event    | result | expected_score | kommentar          |
      | Anna | Shot put | 15     | 790            | Normalvärde        |
      | Anna | Shot put | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Shot put | 30     | 1731           | Gränsvärde (Upper) |

    Examples: Decathlon High jump (Gränser: 0 - 300)
      | name | event     | result | expected_score | kommentar          |
      | Anna | High jump | 190    | 714            | Normalvärde        |
      | Anna | High jump | 0      | 0              | Gränsvärde (Lower) |
      | Anna | High jump | 300    | 1852           | Gränsvärde (Upper) |

    Examples: Decathlon 400m (Gränser: 20 - 100)
      | name | event | result | expected_score | kommentar          |
      | Anna | 400m  | 50     | 815            | Normalvärde        |
      | Anna | 400m  | 20     | 2698           | Gränsvärde (Lower) |
      | Anna | 400m  | 100    | 0              | Gränsvärde (Upper) |

    Examples: Decathlon 110m hurdles (Gränser: 10 - 30)
      | name | event        | result | expected_score | kommentar          |
      | Anna | 110m hurdles | 15     | 850            | Normalvärde        |
      | Anna | 110m hurdles | 10     | 1556           | Gränsvärde (Lower) |
      | Anna | 110m hurdles | 30     | 0              | Gränsvärde (Upper) |

    Examples: Decathlon Discus (Gränser: 0 - 85)
      | name | event  | result | expected_score | kommentar          |
      | Anna | Discus | 40     | 665            | Normalvärde        |
      | Anna | Discus | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Discus | 85     | 1622           | Gränsvärde (Upper) |

    Examples: Decathlon Pole vault (Gränser: 0 - 1000)
      | name | event      | result | expected_score | kommentar          |
      | Anna | Pole vault | 500    | 910            | Normalvärde        |
      | Anna | Pole vault | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Pole vault | 1000   | 2722           | Gränsvärde (Upper) |

    Examples: Decathlon Javelin (Gränser: 0 - 110)
      | name | event   | result | expected_score | kommentar          |
      | Anna | Javelin | 60     | 738            | Normalvärde        |
      | Anna | Javelin | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Javelin | 110    | 1513           | Gränsvärde (Upper) |

    Examples: Decathlon 1500m (Gränser: 150 - 400)
      | name | event | result | expected_score | kommentar          |
      | Anna | 1500m | 250    | 881            | Normalvärde        |
      | Anna | 1500m | 150    | 1719           | Gränsvärde (Lower) |
      | Anna | 1500m | 400    | 124            | Gränsvärde (Upper) |

    Examples: Heptathlon 100m hurdles (Gränser: 10 - 30)
      | name | event        | result | expected_score | kommentar          |
      | Anna | 100m hurdles | 15     | 842            | Normalvärde        |
      | Anna | 100m hurdles | 10     | 1617           | Gränsvärde (Lower) |
      | Anna | 100m hurdles | 30     | 0              | Gränsvärde (Upper) |

    Examples: Heptathlon High jump (Gränser: 0 - 300)
      | name | event     | result | expected_score | kommentar          |
      | Anna | High jump | 170    | 855            | Normalvärde        |
      | Anna | High jump | 0      | 0              | Gränsvärde (Lower) |
      | Anna | High jump | 300    | 2733           | Gränsvärde (Upper) |

    Examples: Heptathlon Shot put (Gränser: 0 - 30)
      | name | event    | result | expected_score | kommentar          |
      | Anna | Shot put | 12     | 661            | Normalvärde        |
      | Anna | Shot put | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Shot put | 30     | 1887           | Gränsvärde (Upper) |

    Examples: Heptathlon 200m (Gränser: 20 - 100)
      | name | event | result | expected_score | kommentar          |
      | Anna | 200m  | 25     | 887            | Normalvärde        |
      | Anna | 200m  | 20     | 1398           | Gränsvärde (Lower) |
      | Anna | 200m  | 100    | 0              | Gränsvärde (Upper) |

    Examples: Heptathlon Long jump (Gränser: 0 - 1000)
      | name | event     | result | expected_score | kommentar          |
      | Anna | Long jump | 600    | 850            | Normalvärde        |
      | Anna | Long jump | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Long jump | 1000   | 2299           | Gränsvärde (Upper) |

    Examples: Heptathlon Javelin (Gränser: 0 - 110)
      | name | event   | result | expected_score | kommentar          |
      | Anna | Javelin | 45     | 763            | Normalvärde        |
      | Anna | Javelin | 0      | 0              | Gränsvärde (Lower) |
      | Anna | Javelin | 110    | 2045           | Gränsvärde (Upper) |

    Examples: Heptathlon 800m (Gränser: 70 - 250)
      | name | event | result | expected_score | kommentar          |
      | Anna | 800m  | 130    | 965            | Normalvärde        |
      | Anna | 800m  | 70     | 2026           | Gränsvärde (Lower) |
      | Anna | 800m  | 250    | 1              | Gränsvärde (Upper) |