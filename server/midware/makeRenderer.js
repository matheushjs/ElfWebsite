const renderer = require("../view/renderer");

/**
 * This middleware makes sure the object `res.renderer` exists.
 *
 * `res.renderer` is a {{#crossLink "Renderer"}}{{/crossLink}} object that should be used to render all pages.
 *
 * **Depends on**:
 * - Nothing
 *
 * **Generates**:
 * - `res.renderer`: The renderer object.
 *
 * @class Midware::makeRenderer.js
 */

module.exports = (req, res, next) => {
  let callname = req.session.callname;
  let specialUser = req.specialUser;
  let language = req.language;
  let translations = req.translations;
  res.renderer = new renderer.Renderer(res, "server/view/pages", callname, specialUser, language, translations);
  next();
};
