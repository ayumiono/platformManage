const traceList = {
	result: [{
			"transactionId": "9999^1535532605576^38",
			"startTime": 1535532720737,
			"err": 1
		},
		{
			"transactionId": "9999^1535532605576^38",
			"startTime": 1535532720737,
			"err": 1
		},
		{
			"transactionId": "9999^1535532605576^38",
			"startTime": 1535532720737,
			"err": 1
		}
	],
	total: 3
}
const trace = [{
	"agentId": "9999",
	"agentStartTime": 1535532605576,
	"annotations": [{
		"key": 93
	}, {
		"key": 94,
		"value": "2.0.0"
	}, {
		"key": 96,
		"value": "0"
	}, {
		"key": 12,
		"value": "com.alibaba.dubbo.rpc.proxy.AbstractProxyInvoker.invoke(com.alibaba.dubbo.rpc.Invocation invocation):71"
	}, {
		"key": 90,
		"value": "[\"jacky\",1]"
	}],
	"applicationName": "apm-demon",
	"applicationServiceType": 1110,
	"elapsed": 1445,
	"endPoint": "192.168.64.124:22223",
	"err": 1,
	"exceptionInfo": {
		"intValue": 1,
		"stringValue": "test err"
	},
	"remoteAddr": "192.168.64.124:64924",
	"rpc": "me.dubbo.api.GBDubboService:sayHello",
	"serviceType": 1110,
	"spanId": 1088076120446891275,
	"startTime": 1535532720737,
	"transactionId": "9999^1535532605576^38",
	"tspanEventList": [{
		"afterTime": 1535532721151,
		"agentId": "9999",
		"annotations": [{
			"key": 12,
			"value": "me.dubbo.server.GBDubboServiceImpl.beforeHello(java.lang.String param1):33"
		}, {
			"key": 904,
			"value": "[\"jacky\"]"
		}, {
			"key": 14,
			"value": "null"
		}],
		"depth": 2,
		"endElapsed": 371,
		"parentSequence": 0,
		"sequence": 1,
		"serviceType": 5000,
		"startElapsed": 43,
		"startTime": 1535532720780,
		"transactionId": "9999^1535532605576^38"
	}, {
		"afterTime": 1535532721685,
		"agentId": "9999",
		"annotations": [{
			"key": 12,
			"value": "com.mysql.jdbc.NonRegisteringDriver.connect(java.lang.String url, java.util.Properties info):306"
		}, {
			"key": -30,
			"value": "-1"
		}],
		"depth": 3,
		"destinationId": "MEMORDER",
		"endElapsed": 533,
		"endPoint": "192.168.50.83:8011",
		"parentSequence": 2,
		"sequence": 3,
		"serviceType": 2100,
		"startElapsed": 415,
		"startTime": 1535532721152,
		"transactionId": "9999^1535532605576^38"
	}, {
		"afterTime": 1535532722165,
		"agentId": "9999",
		"annotations": [{
			"key": 21,
			"value": "{\"strValue1\":\"select * from sys_msg_trans_refind_id where series=?\"}"
		}, {
			"key": 12,
			"value": "com.mysql.jdbc.ConnectionImpl.prepareStatement(java.lang.String sql):4073"
		}],
		"destinationId": "MEMORDER",
		"endElapsed": 480,
		"endPoint": "192.168.50.83:8011",
		"parentSequence": 2,
		"sequence": 4,
		"serviceType": 2100,
		"startElapsed": 948,
		"startTime": 1535532721685,
		"transactionId": "9999^1535532605576^38"
	}, {
		"afterTime": 1535532722182,
		"agentId": "9999",
		"annotations": [{
			"key": 21,
			"value": "{\"strValue1\":\"select * from sys_msg_trans_refind_id where series=?\",\"strValue3\":\"123456\"}"
		}, {
			"key": 12,
			"value": "com.mysql.jdbc.PreparedStatement.executeQuery():1968"
		}],
		"destinationId": "MEMORDER",
		"endElapsed": 17,
		"endPoint": "192.168.50.83:8011",
		"parentSequence": 2,
		"sequence": 5,
		"serviceType": 2101,
		"startElapsed": 1428,
		"startTime": 1535532722165,
		"transactionId": "9999^1535532605576^38"
	}, {
		"afterTime": 1535532722182,
		"agentId": "9999",
		"annotations": [{
			"key": 12,
			"value": "me.dubbo.server.GBDubboServiceImpl.queryDB():51"
		}, {
			"key": 904,
			"value": "null"
		}, {
			"key": 14,
			"value": "\"192.168.26.178\""
		}],
		"endElapsed": 1030,
		"parentSequence": 0,
		"sequence": 2,
		"serviceType": 5000,
		"startElapsed": 415,
		"startTime": 1535532721152,
		"transactionId": "9999^1535532605576^38"
	}, {
		"afterTime": 1535532722182,
		"agentId": "9999",
		"annotations": [{
			"key": 12,
			"value": "me.dubbo.server.GBDubboServiceImpl.sayHello(java.lang.String name, int sex):18"
		}, {
			"key": 904,
			"value": "[\"jacky\",1]"
		}, {
			"key": 14,
			"value": "null"
		}],
		"depth": 1,
		"endElapsed": 1402,
		"exceptionInfo": {
			"intValue": 1,
			"stringValue": "test err"
		},
		"sequence": 0,
		"serviceType": 5000,
		"startElapsed": 43,
		"startTime": 1535532720780,
		"transactionId": "9999^1535532605576^38"
	}]
}]

const dataTemplate = [
	{
		"spanId":9898,
		"tspanEventList":[
			{
				"sequence":1,
				"parentSequence":0
			},
			{
				"sequence":3,
				"parentSequence":2,
				"nextSpanId":2
			},
			{
				"sequence":2,
				"parentSequence":0
			},
			{
				"sequence":4,
				"parentSequence":0
			},
			{
				"sequence":0
			}
		]
	},
	{
		"spanId":-7675,
		"parentSpanId":9898,
		"tspanEventList":[
			{
				"sequence":2,
				"parentSequence":0
			},
			{
				"sequence":1,
				"parentSequence":0
			},
			{
				"sequence":0
			}
		]
	}
]

export const TRACE = {
	'GET /trace/:transactionId': trace,
	'GET /traces': traceList,
	'GET /treedata' : dataTemplate
};