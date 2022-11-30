---
title: Docker 中搭建JavaWeb项目
date: 2021-11-28 16:03:56
tags:
category:
- 技术
- docker
---
## 阅读提示
阅读本文之前，你需要有docker的基础应用知识，包括`cp`,`run`,`exec`,`pull`,`commit`等命令的知识及JavaWeb基础架构等的知识。

## 开发环境与需要的东西
1. Linux 下 Docker 环境
2. Java项目的war包
3. 数据库的导出sql

## 步骤

### mysql容器

```sh
sudo docker run --name mysql-test -d -e MYSQL_ROOT_PASSWORD=123 mysql:5.7
```
其中 --name参数是容器名称，-d参数是后台运行这个容器，并且打印这个容器的id，-e参数是环境变量的设置，需要成功运行就不要忘记设置这一个参数，最后是镜像名称。

### tomcat容器
1. 首先pull tomcat镜像，后面内容以8.5.31为例子。
2. pull完成后

```sh
sudo docker run --name javaweb-test -it -p 8080:8080 --link mysql-test:javaweb-mysql williamrjw/javaweb:v1 /bin/bash
```
其中 --name参数是容器名称，-it是交互式设定，-p是开放8080端口到主机的8080端口上面，--link这就厉害了，他的功能是把某一个容器link到这个容器上面，mysql-test就是上面提到的mysql的容器，而javaweb-mysql则是mysql的容器对于正在创建的容器的“昵称”。

### 配置sql
以终端进入`mysql`容器，将`sql`文件`cp` 到其中，进入mysql的命令行，创建好数据库，使用该数据库，接着就是`source`该文件。
```sql
source /a.sql;
```

### 配置tomcat
以终端进入`tomcat`容器，（此时应该工作路径已经是`/usr/local/tomcat`了），首先删除掉一开始的java项目：
```sh
rm -rf ./webapps/*
```
接下来，把项目的war包重命名为`ROOT.war`，再`cp`进`webapps`文件夹中，运行会自行解压的。
然后运行tomcat：
```sh
./bin/startup.sh
```
会显示如下内容即可从主机8080访问到了。
```sh
Using CATALINA_BASE:   /usr/local/tomcat
Using CATALINA_HOME:   /usr/local/tomcat
Using CATALINA_TMPDIR: /usr/local/tomcat/temp
Using JRE_HOME:        /docker-java-home/jre
Using CLASSPATH:       /usr/local/tomcat/bin/bootstrap.jar:/usr/local/tomcat/bin/tomcat-juli.jar
Tomcat started.
```

### 数据库和java连接注意事项
TODO