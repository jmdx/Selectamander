# Selectamander
*A chrome extension for watching a CSS selector via the toolbar.*

Having a count of the number of elements matching a CSS selector in the toolbar is useful when looking for cross-site scripting vulnerabilities.  You can, for example, attempt to place an <xss> tag somewhere on a site and browse around for places that that the tag shows up unescaped.  With this extension, that is as easy as clicking on the toolbar button and putting "xss" in the "CSS Selector to Watch" input.

This is also useful when cleaning up websites for non-security-related practices, e.g. poking around for <td> elements that may be considered undesirable.

If you use this extension for security-related testing, only do so against domains you have permission to test.

On the Chrome Web Store at https://chrome.google.com/webstore/detail/selectamander/pamjcgiejancmcafhjnifpkldhbnpgen
