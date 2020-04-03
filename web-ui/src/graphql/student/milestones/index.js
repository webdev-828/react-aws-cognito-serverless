import gql from 'graphql-tag';

const FRAGMENT = gql`
  fragment StudentMilestone on student_milestones {
    id
    is_done
    is_enabled
    due_date
  }
  fragment Milestone on milestones {
    id
    name
  }
  fragment Task on milestone_tasks {
    id
    name
    is_coaching
    url
  }
  fragment StudentTask on student_milestone_tasks {
    due_date
    is_done
    is_enabled
    id
  }
  fragment StudentMilestonesDetails on student_milestones {
    ...StudentMilestone
    milestone {
      ...Milestone
        tasks(order_by: {id:asc}) {
        ...Task
        student_tasks(where: { user_id: { _eq: $userId }}) {
          ...StudentTask
        }
      }
    }
  }
`;

export const GET_MILESTONES_SUMMARY = gql`
    query milestones {
        milestones(order_by:{id:asc}){
            id
            tasks(order_by:{id:asc}) {
                id
            }
        }
    }
`;

export const GET_STUDENT_MILESTONES = gql`
  query getStudentMilestones($userId: Int) {
    student_milestones(
      where: { user_id: { _eq: $userId } }
      order_by: [{ due_date: asc }, { milestone_id: asc }]
    ) {
      ...StudentMilestonesDetails
    }
  }
  ${FRAGMENT}
`;

export const POST_STUDENT_MILESTONES_TASKS = gql`
  mutation initMilestones(
    $milestones: [student_milestones_insert_input!]!
    $tasks: [student_milestone_tasks_insert_input!]!
  ) {
    insert_student_milestones(objects: $milestones) {
      returning {
        ...StudentMilestonesDetails
      }
    }
    insert_student_milestone_tasks(objects: $tasks) {
      returning {
        ...StudentTask
      }
    }
  }
  ${FRAGMENT}
`;

export const UPDATE_STUDENT_MILESTONE = gql`
  mutation updateStudentMilestone(
    $id: Int
    $input: student_milestones_set_input
  ) {
    update_student_milestones(where: { id: { _eq: $id } }, _set: $input) {
      returning {
        ...StudentMilestonesDetails
      }
    }
  }
  ${FRAGMENT}
`;

export const UPDATE_STUDENT_MILESTONE_TASK = gql`
  mutation updateStudentMilestoneTask(
    $id: Int
    $input: student_milestone_tasks_set_input
  ) {
    update_student_milestone_tasks(where: { id: { _eq: $id } }, _set: $input) {
      returning {
        ...StudentTask
      }
    }
  }
  ${FRAGMENT}
`;

export const UPSERT_STUDENT_MILESTONE_TASKS = gql`
    mutation add($milestones: [student_milestones_insert_input!]!, $milestoneTasks: [student_milestone_tasks_insert_input!]!) {
        insert_student_milestones(objects: $milestones, on_conflict:{
            constraint:student_milestones_milestone_id_user_id_key,
            update_columns: [is_enabled, due_date, is_done]
        }) {
            returning {
                ...StudentMilestone
            }
        }
        insert_student_milestone_tasks(objects: $milestoneTasks, on_conflict:{
            constraint:student_milestone_tasks_task_id_user_id_key,
            update_columns: [is_done, is_enabled]
        }) {
            returning {
                ...StudentTask
            }
        }
    }
    ${FRAGMENT}
`;

export const GET_MILESTONES_WITH_STUDENT_ID = gql`
    query milestones($userId:Int) {
        milestones(order_by:[{id:asc}]) {
            id
            name,
            student_milestones(where:{user_id:{_eq: $userId}}) {
                is_enabled
                is_done
                due_date
            }
            tasks(order_by:[{id:asc}]) {
                id,
                name,
                is_coaching,
                student_tasks(where:{user_id:{_eq: $userId}}) {
                    due_date
                    is_done
                    is_enabled
                }
            }
        }
    }
`;
