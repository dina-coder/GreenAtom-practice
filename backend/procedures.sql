drop PROCEDURE if EXISTS sp_login;
CREATE PROCEDURE sp_login(
	IN email_ VARCHAR(50),
	IN password_ VARCHAR(100)
)
BEGIN
	select name, id as user_id, role_id from users where email = email_ and password = password_;
END;


drop PROCEDURE if EXISTS sp_get_plans_worker;
CREATE PROCEDURE sp_get_plans_worker(
	IN id_ INT
)
BEGIN
	select plans.id as plan_id, users.name as name,
	worker_id, positions.name as position,
	DATE_FORMAT(date_creation, "%d.%m.%Y") as date_creation,
	super_id, hr_id, position_id, grade_id, step_id, steps.name as step,
	DATE_FORMAT(date_start, "%d.%m.%Y") as date_start,
	DATE_FORMAT(date_end, "%d.%m.%Y") as date_end, result,
	comment, grades.name as grade, susers.name as super,
	husers.name as hr from plans
	left join users on plans.worker_id = users.id
	left join users as susers on plans.super_id = susers.id
	left join users as husers on plans.hr_id = husers.id
	left join grades on grades.id = plans.grade_id
	left join positions on positions.id = plans.position_id
	left join steps on steps.id = plans.step_id
	where users.id = id_;
END;

drop PROCEDURE if EXISTS sp_get_plans_super;
CREATE PROCEDURE sp_get_plans_super(
	IN id_ INT,
	IN si_ INT,
	IN ei_ INT
)
BEGIN
	select plans.id, users.name as name, positions.id as position_id,
	positions.name as position, grades.name as grade,
	worker_id, DATE_FORMAT(date_creation, "%d.%m.%Y") as date_creation,
	super_id, hr_id, step_id, steps.name as step,
	DATE_FORMAT(date_start, "%d.%m.%Y") as date_start,
	DATE_FORMAT(date_end, "%d.%m.%Y") as date_end,
	result, grade_id, comment, susers.name as super,
	husers.name as hr from plans
	left join users on users.id = plans.worker_id
	left join users as susers on susers.id = plans.super_id
	left join users as husers on husers.id = plans.hr_id
	left join grades on grades.id = plans.grade_id
	left join positions on positions.id = plans.position_id
	left join steps on steps.id = plans.step_id
	where super_id = id_ limit si_, ei_;
END;

drop PROCEDURE if EXISTS sp_get_plans_hr;
CREATE PROCEDURE sp_get_plans_hr(
	IN si_ INT,
	IN ei_ INT
)
BEGIN
	select plans.id, users.name as name, positions.id as position_id,
	positions.name as position, grades.name as grade,
	worker_id, DATE_FORMAT(date_creation, "%d.%m.%Y") as date_creation,
	super_id, hr_id, step_id, steps.name as step,
	DATE_FORMAT(date_start, "%d.%m.%Y") as date_start,
	DATE_FORMAT(date_end, "%d.%m.%Y") as date_end,
	result, grade_id, comment, susers.name as super,
	husers.name as hr from plans
	left join users on users.id = plans.worker_id
	left join users as susers on susers.id = plans.super_id
	left join users as husers on husers.id = plans.hr_id
	left join grades on grades.id = plans.grade_id
	left join positions on positions.id = plans.position_id
	left join steps on steps.id = plans.step_id
	limit si_, ei_;
END;

drop PROCEDURE if EXISTS sp_get_tasks;
CREATE PROCEDURE sp_get_tasks(
	IN plan_id_ INT,
	IN si_ INT,
	IN ei_ INT
)
BEGIN
	select id, name,
	DATE_FORMAT(date_creation, "%d.%m.%Y") as date_creation,
	DATE_FORMAT(date_start, "%d.%m.%Y") as date_start,
	DATE_FORMAT(date_end, "%d.%m.%Y") as date_end,
	content, result from tasks where plan_id = plan_id_ limit si_, ei_;
END;

drop PROCEDURE if EXISTS sp_get_dict_grades;
CREATE PROCEDURE sp_get_dict_grades()
BEGIN
	select id, name from grades;
END;

drop PROCEDURE if EXISTS sp_get_dict_names;
CREATE PROCEDURE sp_get_dict_names(
	IN role_id_ INT
)
BEGIN
select id, name from users where role_id = role_id_;
END;

drop PROCEDURE if EXISTS sp_get_dict_steps;
CREATE PROCEDURE sp_get_dict_steps()
BEGIN
	select id, name from steps;
END;

drop PROCEDURE if EXISTS sp_get_dict_positions;
CREATE PROCEDURE sp_get_dict_positions()
BEGIN
	select id, name from positions;
END;

drop PROCEDURE if EXISTS sp_insert_plan;
CREATE PROCEDURE sp_insert_plan(
	IN worker_id_ INT,
	IN position_id_ INT,
	IN super_id_ INT,
	IN hr_id_ INT,
	IN date_start_ DATE,
	IN date_end_ DATE,
	IN result_ TINYINT(1),
	IN grade_id_ INT,
	IN comment_ TEXT
)
BEGIN
	insert into plans (worker_id, position_id, date_creation,
	super_id, hr_id, step_id, date_start, date_end, result,
	grade_id, comment)
	values (worker_id_, position_id_, curdate(), super_id_,
	hr_id_, 1, date_start_, date_end_, result_, grade_id_,
	comment_);
END;

drop PROCEDURE if EXISTS sp_insert_task;
CREATE PROCEDURE sp_insert_task(
	IN plan_id_ INT,
	IN name_ VARCHAR(50),
	IN content_ TEXT,
	IN date_start_ DATE,
	IN date_end_ DATE,
	IN result_ TINYINT(1)
)
BEGIN
	insert into tasks (plan_id, name, date_creation,
	content, date_start, date_end, result)
	values (plan_id_, name_, curdate(), content_,
	date_start_, date_end_, result_);
END;

drop PROCEDURE if EXISTS sp_update_plan;
CREATE PROCEDURE sp_update_plan(
	IN worker_id_ INT,
	IN position_id_ INT,
	IN super_id_ INT,
	IN hr_id_ INT,
	IN step_id_ INT,
	IN date_start_ DATE,
	IN date_end_ DATE,
	IN result_ TINYINT(1),
	IN grade_id_ INT,
	IN comment_ TEXT,
	IN plan_id_ INT
)
BEGIN
	update plans set
	worker_id = worker_id_, position_id = position_id_, super_id = super_id_,
	hr_id = hr_id_, step_id = step_id_, date_start = date_start_,
	date_end = date_end_, result = result_, grade_id = grade_id_,
	comment = comment_
	where id = plan_id_;
END;

drop PROCEDURE if EXISTS sp_update_task;
CREATE PROCEDURE sp_update_task(
	IN plan_id_ INT,
	IN name_ VARCHAR(50),
	IN content_ TEXT,
	IN date_start_ DATE,
	IN date_end_ DATE,
	IN result_ TINYINT(1),
	IN task_id_ INT
)
BEGIN
	update tasks set
	plan_id = plan_id_, name = name_, content = content_, date_start = date_start_,
	date_end = date_end_, result = result_
	where id = task_id_;
END;

drop PROCEDURE if EXISTS sp_update_task_result;
CREATE PROCEDURE sp_update_task_result(
	IN result_ TINYINT(1),
	IN task_id_ INT
)
BEGIN
	update tasks
	set result = result_ where id = task_id_;
END;

drop PROCEDURE if EXISTS sp_delete_plan;
CREATE PROCEDURE sp_delete_plan(
	IN plan_id_ INT
)
BEGIN
	delete from tasks where plan_id = plan_id_;
	delete from plans where id = plan_id_;
END;

drop PROCEDURE if EXISTS sp_delete_task;
CREATE PROCEDURE sp_delete_task(
	IN task_id_ INT
)
BEGIN
	delete from tasks where id = task_id_;
END;

drop PROCEDURE if EXISTS sp_count_tasks;
CREATE PROCEDURE sp_count_tasks(
	IN plan_id_ INT
)
BEGIN
	select count(*) as count from tasks where plan_id = plan_id_;
END;

drop PROCEDURE if EXISTS sp_count_plans;
CREATE PROCEDURE sp_count_plans()
BEGIN
	select count(*) as count from plans;
END;

drop PROCEDURE if EXISTS sp_count_plans_super;
CREATE PROCEDURE sp_count_plans_super(
	IN super_id_ INT
)
BEGIN
	select count(*) as count from plans
	where super_id = super_id_;
END;

drop PROCEDURE if EXISTS sp_get_plans_all;
CREATE PROCEDURE sp_get_plans_all()
BEGIN
	select plans.id, users.name as name, positions.id as position_id,
	positions.name as position, grades.name as grade,
	worker_id, DATE_FORMAT(date_creation, "%d.%m.%Y") as date_creation,
	super_id, hr_id, step_id, steps.name as step,
	DATE_FORMAT(date_start, "%d.%m.%Y") as date_start,
	DATE_FORMAT(date_end, "%d.%m.%Y") as date_end,
	result, grade_id, comment, susers.name as super,
	husers.name as hr from plans
	left join users on users.id = plans.worker_id
	left join users as susers on susers.id = plans.super_id
	left join users as husers on husers.id = plans.hr_id
	left join grades on grades.id = plans.grade_id
	left join positions on positions.id = plans.position_id
	left join steps on steps.id = plans.step_id;
END;

drop PROCEDURE if EXISTS sp_get_plans_all_super;
CREATE PROCEDURE sp_get_plans_all_super(
	IN super_id_ INT
)
BEGIN
	select plans.id, users.name as name, positions.id as position_id,
	positions.name as position, grades.name as grade,
	worker_id, DATE_FORMAT(date_creation, "%d.%m.%Y") as date_creation,
	super_id, hr_id, step_id, steps.name as step,
	DATE_FORMAT(date_start, "%d.%m.%Y") as date_start,
	DATE_FORMAT(date_end, "%d.%m.%Y") as date_end,
	result, grade_id, comment, susers.name as super,
	husers.name as hr from plans
	left join users on users.id = plans.worker_id
	left join users as susers on susers.id = plans.super_id
	left join users as husers on husers.id = plans.hr_id
	left join grades on grades.id = plans.grade_id
	left join positions on positions.id = plans.position_id
	left join steps on steps.id = plans.step_id
	where super_id = super_id_;
END;
