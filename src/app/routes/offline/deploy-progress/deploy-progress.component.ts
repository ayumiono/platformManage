import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzMessageService, NzModalService, UploadFile } from 'ng-zorro-antd';
import { HttpClient, HttpRequest, HttpResponse, HttpResponseBase, HttpErrorResponse } from '@angular/common/http';

import { zip } from 'rxjs';
import { map,filter } from 'rxjs/operators';

import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

import { OfflineService,
DeployProgressQueryModel,DeployProgressModel,DeployProgressQueryResultModel,
DeployProjectQueryModel,DeployProjectModel,DeployProjectQueryResultModel,
PosProjectUpload,
} from '@core/service/public_api';

@Component({
  selector: 'offline-deploy-progress-panel',
  templateUrl: './deploy-progress.component.html',
  styles: []
})
export class OfflineDeployProgressComponent implements OnInit {
	
	@ViewChild('st') st: SimpleTableComponent;
	
	q:DeployProgressQueryModel = new DeployProgressQueryModel();
	
	deployProjects:DeployProjectModel[];
	
	data:DeployProgressQueryResultModel = new DeployProgressQueryResultModel();
	
	uploading = false;
	deployProject:boolean = false;
	file:any;
	deployProjectName:string;
	
	status = [
		{text:'同步成功',value:'Y'},
		{text:'尚未同步成功',value:'N'},
		{text:'同步超时',value:'S'}
	]
	
	columns: SimpleTableColumn[] = [{
			title: "项目名",
			index: "project_name"
		},
		{
			title: "门店名字",
			index: "shop_name"
		},
		{
			title: "同步结果",
			index: "success"
		},
		{
			title: "备注内容",
			index: "resoult_remark"
		}
	];

  constructor(
		private offlineService: OfflineService,
		private http:HttpClient,
		private msg:NzMessageService,
		
	) {}

	ngOnInit() {
		this.q.page_count = 10;
		this.q.page_no = 1;
		this.offlineService.pos_off_allprojectname_get(new DeployProjectQueryModel()).subscribe(
			(deployProjects:DeployProjectQueryResultModel) => {
				this.deployProjects = deployProjects.models;
				this.q.project_name = this.deployProjects[0].project_name;
				this.offlineService.pos_off_allprojectuploadstep_get(this.q).subscribe(
					(deployProjectsProgresss:DeployProgressQueryResultModel)=>{
						this.data = deployProjectsProgresss;
					}
				);
			}
		);
	}
	
	returnHome(){
		this.deployProject = false;
		this.deployProjectName = null;
		this.file = null;
	}
	
	jumpToDeploy(){
		this.deployProject = true;
	}

	getData(){
		this.offlineService.pos_off_allprojectuploadstep_get(this.q)
		.subscribe(
			(res:DeployProgressQueryResultModel) => {
				this.data = res;
			}
		);
	}
	
	upfile = "upfile";
	
	onChange() {
		this.q.page_no = this.st.pi;
		this.getData();
	}
	
	attachParam = ((file: UploadFile) => {
		console.log("attachParam invoke");
		console.log(file);
		return {
			sid:this.offlineService.getSid()
		}
	})
	
	//这里必须要使用方法而不能使用对象,不然组件会把X-Requested-With:null清掉,导致重新添加上X-Requested-With:XMLHttpRequest
	attachHeader = (file: UploadFile) => {
		return {
			"X-Requested-With":null
		}
	}
	
	beforeUpload = (file: UploadFile): boolean => {
    this.file = file;
    return false;
  }
	
	handleUpload(): void {
    const formData = new FormData();
    formData.append("upfile",this.file);
    this.uploading = true;
    const req = new HttpRequest('POST', 'http://cmanagetest.gb246.com/omp_cmanage/uploadSimpleFile', formData, {
      reportProgress: true
    });
    this.http
      .request(req)
      .pipe(
      	filter(e => e instanceof HttpResponseBase)
      )
      .subscribe(
        (event: any) => {
        	if(event instanceof HttpResponse) {
	        	let deployModel = new PosProjectUpload();
	        	deployModel.project_name = this.deployProjectName;
	        	deployModel.url = event.body.fileUrl;
	        	this.offlineService.pos_off_project_upload(deployModel).subscribe(
	        		(res:any) => {
	        			if(res.code == 0) {
	        				this.uploading = false;
	          			this.msg.success('预发布完成.');
	        			}else{
	        				this.uploading = false;
	          			this.msg.error(res.message);
	        			}
	        		}
	        	);
        	}else if(event instanceof HttpErrorResponse) {
	          this.uploading = false;
	          this.msg.error('上传到文件服务器失败');
        	}
        },
        err => {
        	console.log("error:"+err);
          this.uploading = false;
          this.msg.error('上传到文件服务器失败');
        }
      );
  }
}
