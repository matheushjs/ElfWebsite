/**
 * This is not a class; just a convenient way for grouping documentation using YUIDoc.
 *
 * This file has javascript related to fetching json files, containing information about our research
 *   and displaying it into the web page.
 *
 * @class Client::elfResearch.js
 */

import htmlEscape from "escape-html";

// Place research projects in the given table (we add a <tbody> to it)
function placeResearch(array, badgeCss, $table){
  const template = "" +
  "<tr>" +
  "  <th scope='row'>YEAR</th>" +
  "  <td class='js-select'><a href='LINK'>TITLE</a></td>" +
  "</tr>";

  array.forEach(elem => {
    let html = template
    .replace("YEAR", elem.beginDate + "-" + elem.endDate)
    .replace("LINK", elem.href)
    .replace("TITLE", htmlEscape(elem.title));

    let row = $(html);
    let td = row.find(".js-select");

    td.append(" ");
    elem.badges.split(" ").forEach(badge => {
      td.append(
        $("<span class='badge'></span>")
        .text(badge.toUpperCase())
        .css(badgeCss[badge])
      );
      td.append(" ");
    });

    $table.append(row);
  });
}

// Place list of badges in the given table
function placeBadges(badgeTitles, badgeCss, $table){
  const template = "" +
  "<tr>" +
  "   <td>"  +
  "     <span class='badge'>BADGE</span>" +
  "   </td>" +
  "   <td>TITLE</td>" +
  "</tr>";

  for(var abbrv in badgeTitles){
    let row = template
    .replace("BADGE", abbrv.toUpperCase())
    .replace("TITLE", htmlEscape(badgeTitles[abbrv]));

    let $elem = $(row);
    $elem.find(".badge").css(badgeCss[abbrv]);

    $table.append($elem);
  }
}

/**
 * Lists research projects (and a list of badges) as a table in /sci-projects/.
 *
 * @param {JQuery} $researchTable Table to which to append the generated <tbody> with research projects.
 * @param {JQuery} $badgeTable Table to which to append the badge list.
 * @param {JQuery} $spinnerBox Container to hide after we are finished fetching things from the server. We also add error messages here.
 * @method listResearch
 */
/* exported listResearch */
function listResearch($researchTable, $badgeTable, $spinnerBox){
  $.ajax({
    url: "/json/research-projs.json",
    type: "GET",
    dataType: "json",
  })
  .done(json => {
    placeResearch(json.research, json.badgeCss, $researchTable);
    placeBadges(json.badgeTitles, json.badgeCss, $badgeTable);
    $spinnerBox.remove();
  })
  .fail((xhr, status, err) => {
    $spinnerBox.append("<p>Something went wrong in the server. I am really sorry for that. Please try again later.</p>");
    $spinnerBox.append("<p>Server error: " + err + "</p>");
  });
}

function placeArticles(array, $articleTable){
  let template = "" +
    "<tr>" +
    "  <th scope=\"row\">YEAR</th>" +
    "  <td>CONFERENCE</td>" +
    "  <td><a href=\"LINK\">TITLE</a><br><i>REFERENCE</i></td>" +
    "</tr>";

  array.forEach(elem => {
    let row = template
    .replace("YEAR", elem.year)
    .replace("CONFERENCE", htmlEscape(elem.publishedAt))
    .replace("TITLE", htmlEscape(elem.title))
    .replace("LINK", elem.href)
    .replace("REFERENCE", htmlEscape(elem.harvardRef));
    $articleTable.append($(row));
  });
}

/**
 * Places list of articles in a table in /articles/.
 *
 * @param {JQuery} $articleTable Table to which to add rows with the article data.
 * @param {JQuery} $spinnerBox Element containing the spinner showing 'loading...'
 * @method listArticles
 */
function listArticles($articleTable, $spinnerBox){
  $.ajax({
    url: "/json/sci-articles.json",
    type: "GET",
    dataType: "json",
  })
  .done(json => {
    placeArticles(json, $articleTable);
    $spinnerBox.remove();
  })
  .fail((xhr, status, err) => {
    $spinnerBox.append("<p>Something went wrong in the server. I am really sorry for that. Please try again later.</p>");
    $spinnerBox.append("<p>Server error: " + err + "</p>");
  });
}

export default {
  listResearch,
  listArticles
};