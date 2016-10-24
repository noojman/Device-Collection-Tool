$.fn.result = function () {
   var input = document.getElementById('searchInput').value;
   var url = "https://www.ifixit.com/api/2.0/suggest/" + input + "?doctypes=category";
   $.getJSON(url, function (data) {
      search(data);
   });
};

$(document).ready(function () {
   $(window).keydown(function (event) {
      if (event.keyCode == 13) {
         event.preventDefault();
         return false;
      }
   });
});

function search(li) {
   var ul, i, link, elem;
   ul = document.getElementById("searchList");
   elem = document.getElementById("searchItem");
   while (elem != null)
   {
      elem.remove();
      elem = document.getElementById("searchItem");
   }

   for (i = 0; i < li.results.length; i++) {
      (function(index)
      {
         link = li.results[index].url;
         var entry = document.createElement("li");
         entry.setAttribute("class", "listItem");
         entry.setAttribute("id", "searchItem");
         var span = document.createElement("span");
         span.innerText = li.results[index].display_title;
         var div = document.createElement("div");
         div.setAttribute("class", "addButton");
         var a = document.createElement("a");
         a.onclick = function()
         {
            addLinked(li.results[index]);
         }
         div.appendChild(a);
         span.appendChild(div);
         entry.appendChild(span);
         ul.appendChild(entry);
      })(i);
   }
}

function addLinked(device)
{
   var entry, ul;
   entry = document.createElement("li");
   entry.setAttribute("class", "listItem");
   entry.setAttribute("id", "deviceItem");
   entry.innerHTML = "<span><div class='linkButton'><a href=" + device.url + "></a></div>"
      + device.display_title + "<div class='removeButton'><a href=''></a></div></span>";
   ul = document.getElementById("deviceList");
   ul.appendChild(entry);

   /* TODO add to client-sided storage */
}

function addUnlinked() {
   var entry, ul, name;
   name = document.getElementById('searchInput').value;
   entry = document.createElement("li");
   entry.setAttribute("class", "listItem");
   entry.setAttribute("id", "deviceItem");
   entry.innerHTML = name + "<div class='removeButton'><a href=''></a></div></span>";
   ul = document.getElementById("deviceList");
   ul.appendChild(entry);

   /* TODO add to client-sided storage */
}
