var tableHeaders = ['Name', 'Version', 'Latest', 'Description'];

function display(deps, devDeps, config) {
  var readme = document.querySelector('.markdown-body.entry-content');
  var license = document.querySelector('#user-content-license');
  var header = document.createElement('h2');
  var table = document.createElement('table');
  var body = document.createElement('tbody');

  addDependencies(body, deps, config.registry);
  addDependencies(body, devDeps, config.registry, true);

  header.textContent = 'Dependencies (' + config.name + ')';
  header.style.display = 'none';
  table.style.display = 'none';
  tableHeaders.forEach(addTableHeader);
  table.appendChild(body);

  license = license ? license.parentNode : null;
  readme.insertBefore(header, license);
  readme.insertBefore(table, license);

  function addTableHeader(header) {
    var tableHeader = document.createElement('th');
    tableHeader.textContent = header;
    table.appendChild(tableHeader);
  }
}

function addDependencies(body, deps, registry, dev) {
  if (deps) {
    body.appendChild(subHeader(dev))
  }

  for (depName in deps) {
    var row = document.createElement('tr');
    addName(row, depName);
    addVersion(row, deps[depName]);
    addVersion(row, '-');
    row.appendChild(document.createElement('td')); // description
    body.appendChild(row);

    registry(depName, addExtraData.bind(row));
  }
}

function subHeader(dev) {
  var row = document.createElement('tr');
  var td = document.createElement('td');
  var header = document.createElement('strong');

  header.textContent = dev ? 'Development Dependencies' : 'Project Dependencies';
  td.colSpan = tableHeaders.length;
  td.appendChild(header);
  row.appendChild(td);

  return row;
}

function addName(row, name) {
  var td = document.createElement('td');
  var anchor = document.createElement('a');
  anchor.textContent = name;
  td.appendChild(anchor);
  row.appendChild(td);
}

function addVersion(row, version) {
  var td = document.createElement('td');
  var code = document.createElement('code');
  code.textContent = version;
  td.appendChild(code);
  row.appendChild(td);
}

function addExtraData(latestVersion, description, homepage) {
  data = this.getElementsByTagName('td');
  data[0].children[0].setAttribute('href', homepage);
  data[2].children[0].textContent = latestVersion;
  data[3].textContent = description;

  this.parentNode.parentNode.style.display = 'block';
  this.parentNode.parentNode.previousSibling.style.display = 'block';
}

window.display = display;
