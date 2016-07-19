var jsonProcessed = false;

function getStartJsonUrl(url) {
    return "https://raw.githubusercontent.com/MicrosoftDX/startjs/gh-pages/Examples/Simple/start.json";
};

function processStartJsonResponse(response) {
    // TODO(hausdorff): Check response codes, etc.
    return response.json();
}

function generateMarathonJson(json) {
    // Map start.json -> marathon.json.
    var marathonJson = marathonJsonTemplate;
    return marathonJson;
};

function deployOnMarathon(marathonJson) {
    var jobName = document.forms["deployer"]["jobName"].value;
    var imageName = document.forms["deployer"]["dockerImage"].value;

    var url = document.forms["deployer"]["url"].value;
    var marathonUrl = url + 'marathon/v2/apps';

    var marathonJson = timJson;
    marathonJson.id = jobName;
    marathonJson.container.docker.image = imageName;

    fetch("/marathon", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            marathonUrl: marathonUrl,
            marathonJson: marathonJson
        })
    })
    .then(function (response) { alert(JSON.stringify(response)); });
}

function sendDeployPayload() {
    console.log("COW");
    var json = {payload:'Hello World'};
    // marathonIframe.contentWindow.postMessage(JSON.stringify(json), '*');
    return false;
}

function deploy() {
    var startJsonUrl = getStartJsonUrl(document.referrer);
    fetch(startJsonUrl)
        .then(processStartJsonResponse)
        .then(generateMarathonJson)
        .then(deployOnMarathon);

    // Returning `false` prevents the HTML form from submitting. This allows us
    // to `fetch` the `start.json` asynchronously without getting cut off by
    // the form sending a POST request.
    return false;
};

var marathonJsonTemplate = {
    "id": "test",
    "cmd": "npm start",
    "cpus": 1.5,
    "mem": 256.0,
    "requirePorts": false,
    "instances": 3,
    "executor": "",
    "container": {
        "type": "DOCKER",
        "docker": {
            "image": "group/image",
            "network": "BRIDGE",
            "portMappings": [
                {
                    "containerPort": 8080,
                    "hostPort": 0,
                    "servicePort": 9000,
                    "protocol": "tcp"
                },
                {
                    "containerPort": 161,
                    "hostPort": 0,
                    "protocol": "udp"
                }
            ]
        }
    }
};

var timJson = {
    "cmd":null,
    "cpus":1,
    "mem":128,
    "disk":0,
    "instances":1,
    "id":"test",
    "container": {
        "docker": {
            "image":"timpark/test",
            "network":"HOST"
        },
        "type":"DOCKER"
    }
};
