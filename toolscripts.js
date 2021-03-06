$.fn.result = function () {
   var input = document.getElementById('searchInput').value;
   var url = "https://www.ifixit.com/api/2.0/suggest/" + input + "?doctypes=device";
   $.getJSON(url, function (data) {
      search(data);
   });
};

$(document).ready(function () {
   /* fill list with existing data from client-sided storage */
   var i, key;
   for (i = 0; i < localStorage.length; i++)
   {
      key = localStorage.key(i);
      if (JSON.parse(localStorage.getItem(key)).url == null)
      {
         addUnlinkedItemNoStorage(JSON.parse(localStorage.getItem(key)).name);
      }
      else
      {
         addLinkedItemNoStorage(JSON.parse(localStorage.getItem(key)).name, JSON.parse(localStorage.getItem(key)).url);
      }
   }

   if (!navigator.onLine) {
      var input = document.getElementById("searchInput");
      input.setAttribute("placeholder", "No connection. Press [ENTER] to add device...");
   }

   $(window).keydown(function (event) {
      if (event.keyCode == 13) {
         var input = document.getElementById("searchInput");
         var pattern = new RegExp("^\\s*$");
         event.preventDefault();
         if (!pattern.test(input.value)) {
            addUnlinkedItem(document.getElementById('searchInput').value);
         }
         var input = document.getElementById("searchInput");
         input.value = "";
         return false;
      }
   });
});

$(document).ready(function () {
   $('#clearButton').click(function () {
      clear();
   });
});

function search(li) {
   var ul, link, elem;
   ul = document.getElementById("searchList");
   elem = document.getElementById("searchItem");
   while (elem != null) {
      elem.remove();
      elem = document.getElementById("searchItem");
   }

   for (var i = 0; i < li.results.length; i++) {
      (function (index) {
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
         a.onclick = function () {
            addLinkedItem(li.results[index].display_title, li.results[index].url);
         }
         div.appendChild(a);
         span.appendChild(div);
         entry.appendChild(span);
         ul.appendChild(entry);
      })(i);
   }
}

function addUnlinkedItemNoStorage(name) {
   var ul, entry, span, div, a;
   entry = document.createElement("li");
   entry.setAttribute("class", "listItem");
   entry.setAttribute("id", "deviceItem");
   span = document.createElement("span");
   span.innerHTML = name;
   div = document.createElement("div");
   div.setAttribute("class", "removeButton");
   a = document.createElement("a");
   a.onclick = function () {
      removeItem(entry, name);
   }
   div.appendChild(a);
   span.appendChild(div);
   entry.appendChild(span);
   ul = document.getElementById("deviceList");
   ul.appendChild(entry);
}

function addLinkedItemNoStorage(name, url)
{
   var ul, entry, span, div, a;
   entry = document.createElement("li");
   entry.setAttribute("class", "listItem");
   entry.setAttribute("id", "deviceItem");
   span = document.createElement("span");
   span.innerHTML = "<div class='linkButton'><a href=" + url + "></a></div>"
      + name;
   div = document.createElement("div");
   div.setAttribute("class", "removeButton");
   a = document.createElement("a");
   a.onclick = function () {
      removeItem(entry, name);
   }
   div.appendChild(a);
   span.appendChild(div);
   entry.appendChild(span);
   ul = document.getElementById("deviceList");
   ul.appendChild(entry);
}

function addUnlinkedItem(name) {
   if (localStorage.getItem(name) != null) {
      alert("You already own a(n) " + name + ".");
   }
   else {
      var ul, entry, span, div, a;
      entry = document.createElement("li");
      entry.setAttribute("class", "listItem");
      entry.setAttribute("id", "deviceItem");
      span = document.createElement("span");
      span.innerHTML = name;
      div = document.createElement("div");
      div.setAttribute("class", "removeButton");
      a = document.createElement("a");
      a.onclick = function () {
         removeItem(entry, name);
      }
      div.appendChild(a);
      span.appendChild(div);
      entry.appendChild(span);
      ul = document.getElementById("deviceList");
      ul.appendChild(entry);

      /* add to client-sided storage */
      var memEntry = { 'name': name, 'url': null };
      localStorage.setItem(name, JSON.stringify(memEntry));
   }
}

function addLinkedItem(name, url) {
   if (localStorage.getItem(name) != null) {
      alert("You already own a(n) " + name + ".");
   }
   else {
      var ul, entry, span, div, a;
      entry = document.createElement("li");
      entry.setAttribute("class", "listItem");
      entry.setAttribute("id", "deviceItem");
      span = document.createElement("span");
      span.innerHTML = "<div class='linkButton'><a href=" + url + "></a></div>"
         + name;
      div = document.createElement("div");
      div.setAttribute("class", "removeButton");
      a = document.createElement("a");
      a.onclick = function () {
         removeItem(entry, name);
      }
      div.appendChild(a);
      span.appendChild(div);
      entry.appendChild(span);
      ul = document.getElementById("deviceList");
      ul.appendChild(entry);

      /* add to client-sided storage */
      var memEntry = { 'name': name, 'url': url };
      localStorage.setItem(name, JSON.stringify(memEntry));
   }
}

function removeItem(elem, name) {
   elem.remove();

   /* remove from client-sided storage */
   localStorage.removeItem(name);
}

function clear()
{
   localStorage.clear();
   ul = document.getElementById("deviceList");
   elem = document.getElementById("deviceItem");
   while (elem != null) {
      elem.remove();
      elem = document.getElementById("deviceItem");
   }
}
