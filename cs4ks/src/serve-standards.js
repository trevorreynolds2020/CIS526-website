const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const database = require('./database.js');


function serveStandards(req,res){
  
    var standards = database.prepare(`SELECT 
      standards.identifier AS identifier,
      standards.description AS description,
      standards.summary AS summary,
      concepts.name AS concept,
      concepts.abbr AS conceptAbbr,
      subconcepts.name AS subconcept,
      subconcepts.abbr AS subconceptAbbr,
      grade_levels.name AS gradeLevel,
      grade_levels.abbr AS gradeLevelAbbr,
      (  SELECT group_concat(practices.id || '. ' || practices.name, ', ') 
         FROM practices 
         INNER JOIN standards_practices ON practices.id = standards_practices.practice_id 
       WHERE standards_practices.standard_id = standards.id
      ) AS practices
    FROM standards 
    INNER JOIN concepts on standards.concept_id = concepts.id
    INNER JOIN subconcepts on standards.subconcept_id = subconcepts.id 
    INNER JOIN grade_levels on standards.grade_level_id = grade_levels.id;`).all();   
  
  

    var data = {
        standards: standards
      }

   // Renders the HTML with injected JS
   ejs.renderFile("templates/standards.html.ejs", data, function(err, html){
        // Handle an error
        if(err) {
          console.error(err);
          res.writeHead(500);
          res.end();
          return;
        }
        // Serve the page
        res.writeHeader(200, {
          "Content-Type": "text/html",
          "Content-Length": html.length
        });
     res.end(html);
    });
  

}

module.exports = serveStandards;