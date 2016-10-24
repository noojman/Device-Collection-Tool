$.fn.result = function ()
{
   var input = document.getElementById('searchInput').value;
   var url = "https://www.ifixit.com/api/2.0/suggest/" + input + "?doctypes=category";
   $.getJSON(url, function (data)
   {
      search(data);
   });
};

$(document).ready(function ()
{
   /* TODO fill list with existing data from client-sided storage */

   if (!navigator.onLine)
   {
      var input = document.getElementById("searchInput");
      input.setAttribute("placeholder", "No connection. Press [ENTER] to add device...");
   }

   $(window).keydown(function (event)
   {
      if (event.keyCode == 13)
      {
         var input = document.getElementById("searchInput");
         var pattern = new RegExp("^\\s*$");
         event.preventDefault();
         if (!pattern.test(input.value))
         {
            addUnlinked();
         }
         var input = document.getElementById("searchInput");
         input.value = "";
         return false;
      }
   });
});

function search(li)
{
   var ul, i, link, elem;
   ul = document.getElementById("searchList");
   elem = document.getElementById("searchItem");
   while (elem != null)
   {
      elem.remove();
      elem = document.getElementById("searchItem");
   }

   for (i = 0; i < li.results.length; i++)
   {
      (function(index)
      {
         var entry, span, div, a;
         link = li.results[index].url;
         entry = document.createElement("li");
         entry.setAttribute("class", "listItem");
         entry.setAttribute("id", "searchItem");
         span = document.createElement("span");
         span.innerText = li.results[index].display_title;
         div = document.createElement("div");
         div.setAttribute("class", "addButton");
         a = document.createElement("a");
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
   var ul, entry, span, div, a;
   entry = document.createElement("li");
   entry.setAttribute("class", "listItem");
   entry.setAttribute("id", "deviceItem");
   span = document.createElement("span");
   span.innerHTML = "<div class='linkButton'><a href=" + device.url + "></a></div>"
      + device.display_title;
   div = document.createElement("div");
   div.setAttribute("class", "removeButton");
   a = document.createElement("a");
   a.onclick = function()
   {
      removeLinkedItem(entry);
   }
   div.appendChild(a);
   span.appendChild(div);
   entry.appendChild(span);
   ul = document.getElementById("deviceList");
   ul.appendChild(entry);

   /* TODO add to client-sided storage */
}

function addUnlinked()
{
   var ul, name, entry, span, div, a;
   name = document.getElementById('searchInput').value;
   entry = document.createElement("li");
   entry.setAttribute("class", "listItem");
   entry.setAttribute("id", "deviceItem");
   span = document.createElement("span");
   span.innerHTML = name;
   div = document.createElement("div");
   div.setAttribute("class", "removeButton");
   a = document.createElement("a");
   a.onclick = function () {
      removeUnlinkedItem(entry);
   }
   div.appendChild(a);
   span.appendChild(div);
   entry.appendChild(span);
   ul = document.getElementById("deviceList");
   ul.appendChild(entry);

   /* TODO add to client-sided storage */
}

function removeLinkedItem(elem)
{
   elem.remove();

   /* TODO remove from client-sided storage */
}

/* TODO check if unlinked version is necessary */
function removeUnlinkedItem(elem)
{
   elem.remove();

   /* TODO remove from client-sided storage */
}
