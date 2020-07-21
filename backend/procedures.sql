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
	super_id, hr_id, steps.name as step,
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
