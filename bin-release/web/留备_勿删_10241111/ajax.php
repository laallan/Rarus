<?php
		header('Content-Type: text/html; charset=utf-8');
		require_once('db/db.php');
		$db = new DB;
		$flg = (int)$_GET['flg'];
		switch ($flg)
		{
		case 1: //注册
		  register();
		  break;
		case 2: //刷新分数
		  refresh();
		  break;
		case 3: //检查账号手机
		  check();
		   break;
		case 4: //全部排行榜
		  all_rank();
		   break;
		case 5: //个人排行榜
		  single_rank();
		   break;
		}

		function gl($data){
			return trim(addslashes(strip_tags($data)));
		}

		function register(){
			global $db;
			//基本信息
			$userName = gl($_POST['userName']);
			$companyName = gl($_POST['companyName']);
			$companyNature = gl($_POST['companyNature']);
			$industry = gl($_POST['industry']);
			$email = $_POST['email'];
			$phone = gl($_POST['phone']);
			$allowEmail = (int)$_POST['allowEmail'];
			if(empty($userName)) die('-1');
			if(empty($companyName)) die('-2');
			if(empty($companyNature)) die('-3');
			if(empty($industry)) die('-4');
			if(filter_var($email, FILTER_VALIDATE_EMAIL) == false) die('-5');
			if((strlen($phone) != 11 || strlen($phone) != 8) && !is_numeric($phone)) die('-6');
			//分数
			$score = gl($_POST['score']);
			if(!is_numeric($score)) die('-7');
			//搜索是否已有账号
			$sql = "SELECT * FROM rarus_user WHERE userName = '".$userName."' OR phone = '".$phone."' ";
			$r = $db->get_one($sql);
			if($r){
				refresh($userName,$phone,$score);
			}else{
				$dataArray = array(	  "userName" =>$userName,
												  "companyName" => $companyName,
												  "companyNature" => $companyNature,
												  "industry" =>$industry,
												  "email"=>$email,
												  "phone"=>$phone,
												  "score"=>$score,
												  "add_time" => date("Y-m-d H:i:s"),
												  "allowEmail" => $allowEmail
												);
				$db->insert('rarus_user',$dataArray);
				echo $db->insert_id();
			}

		}

		function refresh($userName = '',$phone = '',$score = ''){
			global $db;
			if(empty($userName) || empty($phone) || empty($score)){
				$userName = gl($_POST['userName']);
				$phone = gl($_POST['phone']);
				$score = gl($_POST['score']);
			}
			if(empty($userName)) die('-1');
			if((strlen($phone) != 11 || strlen($phone) != 8) && !is_numeric($phone)) die('-6');
			if(!is_numeric($score)) die('-7');
			$dataArray = array("score" =>$score,"last_update"=>date("Y-m-d H:i:s"));
			$where = "phone = '".$phone."' AND userName = '".$userName."' ";
			$db->update('rarus_user',$dataArray,$where);
			$sql = "SELECT id FROM rarus_user ORDER BY last_update DESC LIMIT 1";
			$up = $db->get_one($sql);
			echo $up['id'];
		}

		function check(){
			global $db;
			$userName = gl($_POST['userName']);
			$phone = gl($_POST['phone']);
			if(empty($userName) && empty($phone)){
				die('-8');
			}

		    if($userName && empty($phone)){
				$where = "WHERE userName = '".$userName."' ";
			}else if(empty($userName) && $phone){
				$where = "WHERE phone = '".$phone."' ";
			}
			$sql = "SELECT * FROM rarus_user ".$where;
			$r = $db->get_one($sql);
			if($r){
				echo '-11';
			}else{
				echo '-12';
			}
		}

		function all_rank(){
			global $db;
			$str = '';
			$sql = "SELECT userName,score FROM `rarus_user` ORDER BY score DESC,add_time ASC LIMIT 50";
			$r = $db->get_all($sql);
			foreach ($r as $value)
			{
				$str .=$value['userName'].','.$value['score'].'~|';
			}
			$str = substr($str,0,strlen($str)-2);
			echo $str;

		}

		function single_rank(){
			global $db;
			$pm = 0;
			//获取用户数据
			$id = gl($_POST['id']);
			$sql = "SELECT userName,score FROM `rarus_user` WHERE id = '".$id."' ";
			$r = $db->get_one($sql);
			$score = $r['score'];
			//获取所有数据
			$sql = "SELECT id FROM `rarus_user` ORDER BY score DESC ";
			$zs = $db->get_all($sql);
			$c = count($zs);
			foreach($zs as $key=>$value){
				if($value['id'] == $id){
					$pm = $key-4;
					if($pm <= 0) $pm = 1;
					break;
				}
			}
			//获取前后几名
			$str = $pm.'+|';
			$sql = "SELECT id,userName,score FROM `rarus_user` WHERE score >= '".$score."' ORDER BY score ASC LIMIT 5";
			$r_one = $db->get_all($sql);
			$r_one = array_reverse($r_one);
			$sql = "SELECT id,userName,score FROM `rarus_user` WHERE score < '".$score."' ORDER BY score DESC LIMIT 20";
			$r_two = $db->get_all($sql);
			$rr = array_merge_recursive($r_one,$r_two);
			$rr = array_slice($rr,0,20);
			foreach ($rr as $value)
			{
				if($value['id'] == $id){
					$str .=$value['userName'].','.$value['score'].',1~|';
				}else{
					$str .=$value['userName'].','.$value['score'].'~|';
				}
			}
			$str = substr($str,0,strlen($str)-2);
			echo $str;

		}


?>